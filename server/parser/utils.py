from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import os
import cv2
import pytesseract
from ultralytics import YOLO
import pandas as pd


# Set Tesseract-OCR path
pytesseract.pytesseract.tesseract_cmd = r'C:\Program Files\Tesseract-OCR\tesseract.exe'

# Path to YOLO model
model = YOLO(r'E:\Artifical Intelligence\Project\Cv Parsing.v8i.yolov8\best.pt')

# Path to save cropped images
cropped_dir = r'E:\Artifical Intelligence\Project\Cv Parsing.v8i.yolov8\cropped_images'
os.makedirs(cropped_dir, exist_ok=True)


# Preprocess image for OCR
def preprocess_image(image):
    gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)  # Convert to grayscale
    thresh = cv2.threshold(gray, 0, 255, cv2.THRESH_BINARY + cv2.THRESH_OTSU)[1]  # Threshold the image
    return thresh


def parse_cv_images(image_files):
    data_structure = {"Name": [], "Skills": [], "Experience": [], "Education": [], "Email": [], "Phone": [], "Certifications": [], "Projects": []}

    for image_path in image_files:
        # Load the image
        image = cv2.imread(image_path)
        if image is None:
            continue

        # Perform inference with YOLO model
        results = model.predict(source=image, save=True, conf=0.5)

        for result in results:
            labels = result.names
            for box in result.boxes:
                class_id = int(box.cls)
                label = labels[class_id]

                if label not in data_structure:
                    continue

                x1, y1, x2, y2 = map(int, box.xyxy[0])
                cropped_image = image[y1:y2, x1:x2]
                if cropped_image.size == 0:
                    continue

                processed_image = preprocess_image(cropped_image)

                # Extract text with pytesseract
                extracted_text = pytesseract.image_to_string(processed_image, config='--psm 6').strip()
                data_structure[label].append(extracted_text)

    # Save results to Excel
    output_df = pd.DataFrame({label: pd.Series(data) for label, data in data_structure.items()})
    output_file = r"E:\Artifical Intelligence\Project\Cv Parsing.v8i.yolov8\results_structured.xlsx"
    output_df.to_excel(output_file, index=False)

    return {
        "status": "Parsing completed",
        "results_saved_to": output_file,
        "cropped_images_saved_to": cropped_dir,
    }


# Handle file upload endpoint
@csrf_exempt
def handle_file_upload(request):
    if request.method == 'POST' and request.FILES.getlist('files'):
        uploaded_files = request.FILES.getlist('files')
        saved_image_paths = []

        # Save uploaded files temporarily
        for uploaded_file in uploaded_files:
            file_path = os.path.join('uploaded_files', uploaded_file.name)
            os.makedirs(os.path.dirname(file_path), exist_ok=True)
            with open(file_path, 'wb') as f:
                f.write(uploaded_file.read())
            saved_image_paths.append(file_path)

        # Process these images with parsing logic
        result = parse_cv_images(saved_image_paths)

        return JsonResponse({
            "message": result["status"],
            "results_saved_to": result["results_saved_to"],
            "cropped_images_saved_to": result["cropped_images_saved_to"]
        })
    
    return JsonResponse({"error": "No files uploaded or invalid request."}, status=400)
