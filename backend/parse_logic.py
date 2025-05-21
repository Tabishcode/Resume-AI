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
genai.configure(api_key="API Key of gemini")
model = genai.GenerativeModel("gemini-1.5-flash")

# Load YOLO model
model_yolo = YOLO(r"E:\Artifical Intelligence\Project\Cv Parsing.v8i.yolov8\best.pt")


def process_image(image_path):
    print(image_path, "is pathh")
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

**Rules:**
1. Output must be in JSON format.
2. Include every key, even if the value is an empty string or array.
3. Do not add any other keys or fields.
4. Exclude any data that doesn't match a predefined key.
5. Categorize data accurately.
6. Summarize all sections's espically Experience, Education, Projects and Profile to few words.
7. Just for Education, Experience and Projects the value should be an array where at each index is a descriptive string of that particular item related to that section.
8. Return all content within a single section, no sub-sections. make all sections as an array
Here is the data to process:
{combined_text}
"""

        response = model.generate_content(prompt_text)
        print("hello i am in")
        match = re.search(r"\{.*\}", response.text, re.DOTALL)
        actual_json = match.group(0) if match else response.text.strip()
        return {"Image": os.path.basename(image_path), "Response": actual_json}
    except Exception as e:
        return {"error": str(e)}
# and do not add line breks between text very frequently but add commas, colons, full stops between text

def process_images_in_parallel(image_dir):
    image_paths = [os.path.join(image_dir, img) for img in os.listdir(image_dir) if img.endswith((".png", ".jpg", ".jpeg"))]

    with ThreadPoolExecutor(max_workers=cpu_count()) as executor:
        results = list(filter(None, executor.map(process_image, image_paths)))
    return results
