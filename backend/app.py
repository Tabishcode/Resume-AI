import os
from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy  # Add this
from parse_logic import process_image, process_images_in_parallel  # Import your processing logic
from werkzeug.security import generate_password_hash, check_password_hash 
from werkzeug.utils import secure_filename

app = Flask(__name__)
CORS(app)  # Enable CORS for cross-origin requests

# SQLite configuration
BASE_DIR = os.path.abspath(os.path.dirname(__file__))
app.config['SQLALCHEMY_DATABASE_URI'] = f"sqlite:///{os.path.join(BASE_DIR, 'app.db')}"
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# Initialize SQLAlchemy
db = SQLAlchemy(app)


# Define the User model
class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    password = db.Column(db.String(200), nullable=False)
    google_id = db.Column(db.String(100), unique=True, nullable=True)

# Create database tables
with app.app_context():
    db.create_all()


#Routes
@app.route('/signup', methods=['POST'])
def signup():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')

    # Check if username already exists
    if User.query.filter_by(username=username).first():
        return jsonify({"error": "Username already exists"}), 400

    # Hash the password and save the user
    hashed_password = generate_password_hash(password)  # No need to pass method='sha256'
    new_user = User(username=username, password=hashed_password)
    db.session.add(new_user)
    db.session.commit()

    return jsonify({"message": "User registered successfully"}), 201


@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')

    # Fetch user from the database
    user = User.query.filter_by(username=username).first()
    if not user or not check_password_hash(user.password, password):
        return jsonify({"error": "Invalid username or password"}), 401

    return jsonify({"message": "Login successful"}), 200




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

        # Process image
        result = process_image(file_path)
        results.append(result)

    return jsonify(results), 200


@app.route("/bulk-process", methods=["POST"])
def bulk_process():
    try:
        results = process_images_in_parallel(app.config["UPLOAD_FOLDER"])
        # Save results to Excel
        output_file = os.path.join(RESULT_FOLDER, "output.xlsx")
        pd.DataFrame(results).to_excel(output_file, index=False)
        return jsonify({"message": "Processing completed", "output_file": output_file}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500







# Run the app
if __name__ == '__main__':
    app.run(debug=True)

