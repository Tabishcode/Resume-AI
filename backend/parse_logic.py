import os
import cv2
import pytesseract
from ultralytics import YOLO
import google.generativeai as genai
from concurrent.futures import ThreadPoolExecutor
from multiprocessing import cpu_count
import re

# Set Tesseract-OCR path
pytesseract.pytesseract.tesseract_cmd = r"C:\Program Files\Tesseract-OCR\tesseract.exe"

# Configure Google Generative AI
genai.configure(api_key="AIzaSyCVQrjwFICZsZUJ52rRU2Me7l9xRmyAMDs")
model = genai.GenerativeModel("gemini-1.5-flash")

# Load YOLO model
model_yolo = YOLO(r"E:\Artifical Intelligence\Project\Cv Parsing.v8i.yolov8\best.pt")


def process_image(image_path):
    try:
        image = cv2.imread(image_path)
        if image is None:
            return {"error": f"Could not load image: {image_path}"}

        extracted_data = []

        # Perform OCR on the full image
        full_text = pytesseract.image_to_string(image, config="--psm 3").strip().split("\n")
        extracted_data.extend([line.strip() for line in full_text if line.strip()])

        # YOLO inference
        results = model_yolo.predict(source=image, save=False, conf=0.5)

        # Extract bounding box text
        for result in results:
            labels = result.names
            for box in result.boxes:
                x1, y1, x2, y2 = map(int, box.xyxy[0])  # Bounding box coordinates
                cropped_image = image[y1:y2, x1:x2]
                if cropped_image.size == 0:
                    continue

                # Preprocess cropped image
                processed_image = cv2.cvtColor(cropped_image, cv2.COLOR_BGR2GRAY)
                extracted_text = pytesseract.image_to_string(processed_image, config="--psm 3").strip()
                if extracted_text:
                    extracted_data.append(extracted_text)

        # Combine extracted data
        combined_text = "\n".join(extracted_data)

        # AI prompt
        prompt_text = f"""
You are given data scraped from a resume. Your task is to strictly categorize it into the following predefined keys: 
- Name
- Education
- Experience
- Skills
- Projects
- Profile
- Phone
- Languages
- Certifications
- Interests
- Address
- Email
- LinkedIn
- GitHub
- Other Links.

**Guidelines:**
1. The output **must** be in JSON format.
2. Every key **must** be included in the output, even if the value is `[]` (for arrays) or an empty string (`""`) for missing data.
3. Do **not** create any keys or fields beyond the ones provided above.
4. If the input data doesn't match a predefined key, it should **not** appear in the JSON output.
5. Ensure data categorization is precise based on the provided keys.

Here is the data to process:
{combined_text}
"""

        response = model.generate_content(prompt_text)
        match = re.search(r"\{.*\}", response.text, re.DOTALL)
        actual_json = match.group(0) if match else response.text.strip()
        return {"Image": os.path.basename(image_path), "Response": actual_json}
    except Exception as e:
        return {"error": str(e)}


def process_images_in_parallel(image_dir):
    image_paths = [os.path.join(image_dir, img) for img in os.listdir(image_dir) if img.endswith((".png", ".jpg", ".jpeg"))]

    with ThreadPoolExecutor(max_workers=cpu_count()) as executor:
        results = list(filter(None, executor.map(process_image, image_paths)))
    return results
