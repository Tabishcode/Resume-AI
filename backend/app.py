import os  # Add this line
from flask import Flask, request, jsonify
from flask_cors import CORS
from parse_logic import process_image, process_images_in_parallel
import pandas as pd
import json
from flask_sqlalchemy import SQLAlchemy  # Add this
from werkzeug.security import generate_password_hash, check_password_hash 
from werkzeug.utils import secure_filename
from sqlalchemy.sql import text
from convertSource import convert_file


app = Flask(__name__)
CORS(app)  # Enable CORS for cross-origin requests


@app.route('/', methods=['GET'])
def configuration_check():
    print("Someone pinged the root")
    return jsonify("Get Request is working")


##########################################3
# Database Configuration
##########################################3

# SQLite configuration
BASE_DIR = os.path.abspath(os.path.dirname(__file__))
# app.config['SQLALCHEMY_DATABASE_URI'] = f"sqlite:///{os.path.join(BASE_DIR, 'app.db')}"

# configuration for Azure SQL Database
app.config['SQLALCHEMY_DATABASE_URI'] = (
    'mssql+pyodbc://saqlain:5241MAfhh$#%40@vitalhubserver.database.windows.net/PersonalDB?driver=ODBC+Driver+18+for+SQL+Server'
)
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# Initialize SQLAlchemy
db = SQLAlchemy(app)


# Create database tables
with app.app_context():
    db.create_all()

# Configuration
UPLOAD_FOLDER = "static/uploads"
RESULT_FOLDER = "static/results"
os.makedirs(UPLOAD_FOLDER, exist_ok=True)
os.makedirs(RESULT_FOLDER, exist_ok=True)
app.config["UPLOAD_FOLDER"] = UPLOAD_FOLDER

@app.route("/upload", methods=["POST"])
def upload_images():
    if "images" not in request.files:
        return jsonify({"error": "No images provided"}), 400

    images = request.files.getlist("images")
    results = []

    for image_file in images:
        filename = secure_filename(image_file.filename)
        file_path = os.path.join(app.config["UPLOAD_FOLDER"], filename)
        image_file.save(file_path)

        # Check file extension and process accordingly (PDF, DOCX, or image)
        file_extension = os.path.splitext(filename)[1].lower()

        if file_extension == '.pdf' or file_extension == '.docx':
            # Convert PDF or DOCX to image
            converted_image_path = convert_file(file_path)
            result = process_image(converted_image_path)
            results.append(result)
        else:
            # Process image files using your existing image processing logic
            result = process_image(file_path)
            results.append(result)

    return jsonify(results), 200

#################################################
# The Routes for the Database Storage and Retrieval
#################################################
# Example model (you can define your tables here)

@app.route("/get<int:id>", methods=["GET"])
def retrieve_data(id):
    if id:
        try:
            result = db.session.execute(text(f"SELECT * FROM resumes WHERE id = {id}")).fetchone()
            return str(result)
        except Exception as e:
            return f"Error occurred: {str(e)}"
        
@app.route("/get/<id>", methods=["GET"])
def select_id_data(id):
    try:
        results = db.session.execute(text(f"SELECT * FROM resumes where user_id={id}")).fetchall()
        column_names = ['id', 'data']  # Replace with actual column names from your table
        result_dicts = [dict(zip(column_names, row)) for row in results]

        # Return the result as JSON
        return jsonify(result_dicts)
    except Exception as e:
        return f"Error occurred: {str(e)}"

@app.route("/get_all", methods=["GET"])
def select_data_raw():
    try:
        results = db.session.execute(text("SELECT * FROM resumes")).fetchall()
        column_names = ['id', 'data']  # Replace with actual column names from your table
        result_dicts = [dict(zip(column_names, row)) for row in results]

        # Return the result as JSON
        return jsonify(result_dicts)
    except Exception as e:
        return f"Error occurred: {str(e)}"

@app.route('/update<int:id>', methods=['POST'])
def update_data(id):
    # Retrieve data from the POST request
    new_data = request.json.get('data')  # Assuming you're sending JSON data

    # Construct raw SQL query to update data
    sql = f"UPDATE resumes SET data = '{new_data}' WHERE id = {id}"

    try:
        # Execute the raw SQL query
        db.session.execute(text(sql))
        db.session.commit()  # Commit the transaction to the database
        return f"Data with ID {id} updated successfully", 200
    except Exception as e:
        db.session.rollback()  # Rollback if there's an error
        return f"Error occurred: {str(e)}", 500

@app.route('/store', methods=['POST'])
def store_data():
    # Retrieve incoming JSON data
    incoming_json = request.json.get('data')
    userid = request.json.get('userId')
   
    if not incoming_json:
        return "Invalid data format", 400
    
    try:
        # Convert incoming data string to JSON for comparison
        incoming_name = incoming_json.get("Name", "").lower()
        incoming_email = incoming_json.get("Email", "").lower()
        incoming_phone = incoming_json.get("Phone", "")

        # Fetch existing records from the database
        sql_fetch = "SELECT data FROM resumes"
        results = db.session.execute(text(sql_fetch)).fetchall()

        # Compare with existing records
        for row in results:
            stored_json = json.loads(row.data)  # Convert stored data string back to JSON
            stored_name = stored_json.get("Name", "").lower()
            stored_email = stored_json.get("Email", "").lower()
            stored_phone = stored_json.get("Phone", "")

            # Check for duplication
            if (incoming_name == stored_name and
                incoming_email == stored_email and
                incoming_phone == stored_phone):
                print(f"Duplicate found: {incoming_name}")
                return "Duplicate record found. Data not added.", 201

        # If no duplicate, insert the new record
        sql_add = "INSERT INTO resumes (data, user_id) VALUES (:data, :id)"
        db.session.execute(text(sql_add), {"data": json.dumps(incoming_json), "id": userid})
        db.session.commit()
        return "Data added successfully", 201

    except Exception as e:
        print(f"the following error occured: {str(e)}")
        db.session.rollback()
        return f"Error occurred: {str(e)}", 500

# Run the app
if __name__ == '__main__':
    app.run(debug=True)
