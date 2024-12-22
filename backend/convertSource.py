from pdf2image import convert_from_path
from docx import Document
from PIL import Image, ImageDraw, ImageFont
import os

# Function to convert PDF to Image
def pdf_to_image(pdf_path):
    output_directory = "new_cvs_imgs"
    if not os.path.exists(output_directory):
        os.makedirs(output_directory)

    # Specify the path to Poppler (where `pdftoppm.exe` is located)
    poppler_path = r'E:\Artifical Intelligence\Project\Website\poppler-24.08.0\Library\bin'  # Replace this with your actual Poppler path
    
    # Extract the PDF file name without extension
    pdf_name = os.path.splitext(os.path.basename(pdf_path))[0]

    # Convert the first page of the PDF to an image
    images = convert_from_path(pdf_path, first_page=1, last_page=1, poppler_path=poppler_path)

    # Save the first page with the same name as the PDF
    output_path = os.path.join(output_directory, f"{pdf_name}.jpg")
    images[0].save(output_path, "JPEG")

    print(f"Saved: {output_path}")
    return output_path

# Function to convert DOCX to Image
def docx_to_image(docx_path):
    output_directory = "new_cvs_imgs"
    if not os.path.exists(output_directory):
        os.makedirs(output_directory)

    # Extract the DOCX file name without extension
    docx_name = os.path.splitext(os.path.basename(docx_path))[0]

    # Open the DOCX file
    doc = Document(docx_path)

    # Create a blank image with a white background
    width, height = 800, 1000  # Adjust size based on your text
    img = Image.new("RGB", (width, height), color="white")
    draw = ImageDraw.Draw(img)

    # Load a font (default or custom)
    try:
        font = ImageFont.truetype("arial.ttf", 20)  # Replace with path to a valid font file if necessary
    except IOError:
        font = ImageFont.load_default()

    # Write content from DOCX to the image
    y_position = 10
    for para in doc.paragraphs:
        # Draw the paragraph text on the image
        draw.text((10, y_position), para.text, fill="black", font=font)
        y_position += 30  # Space between paragraphs
        if y_position > height - 50:  # Check if the image height is reached, create a new page (new image)
            img.save(os.path.join(output_directory, f"{docx_name}_page_1.jpg"))
            # Create a new blank page for further content
            img = Image.new("RGB", (width, height), color="white")
            draw = ImageDraw.Draw(img)
            y_position = 10  # Reset position for the new page

    # Save the generated image with DOCX content
    output_path = os.path.join(output_directory, f"{docx_name}.jpg")
    img.save(output_path)

    print(f"Saved: {output_path}")
    return output_path


# Main function to handle file conversion based on extension
def convert_file(file_path):
    file_extension = os.path.splitext(file_path)[1].lower()
    print(f"file format: {file_extension}")
    if file_extension == '.pdf':
        # Convert PDF to image
        return pdf_to_image(file_path)
    elif file_extension == '.docx':
        # Convert DOCX to image
        return docx_to_image(file_path)
    else:
        print(f"Unsupported file format: {file_extension}")
        return None

