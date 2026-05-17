# AI-Powered Resume Parser Website

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

An AI-powered full-stack web application that parses resumes, extracts key information, and displays it in an easy-to-read format. Built to help recruiters and job seekers quickly analyze resumes and generate reports.

## Features

- Upload and parse resumes (PDF, DOCX supported)
- Display parsed data in clean, interactive tables
- Preview resumes before and after parsing
- Manage and view previously parsed resumes/history
- Export parsed data as downloadable PDF reports
- Responsive UI for both desktop and mobile
- Powered by React.js frontend and Flask backend
- AI model integration for accurate resume parsing

## Tech Stack

- Frontend: React.js, TypeScript, Tailwind CSS  
- Backend: Flask (Python)  
- Database: MySQL  
- Others: REST APIs, PDF generation libraries

## Getting Started

### Prerequisites

- Node.js (v16+ recommended)
- Python 3.8+
- MySQL Server

### Installation

1. Clone the repository

```bash
git clone https://github.com/Tabishcode/Resume-AI.git
cd Resume-AI
Backend setup

bash
Copy
Edit
cd backend
python -m venv venv
source venv/bin/activate  # On Windows use `venv\Scripts\activate`
pip install -r requirements.txt
# Configure database connection in `config.py`
flask run

Frontend setup

bash
Copy
Edit
cd ../frontend
npm install
npm start
