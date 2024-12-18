from django.http import JsonResponse
from .parsingLogic import parse_cv_images
from django.views.decorators.csrf import csrf_exempt

# Home view - you can customize this
def home(request):
    return JsonResponse({"message": "Welcome to the CV Parser Home Page"})


# Handle file upload logic
@csrf_exempt  # Exempt CSRF for testing (ensure proper handling later)
def handle_file_upload(request):
    if request.method == "POST" and request.FILES.get('file'):
        try:
            uploaded_file = request.FILES['file']
            
            # Process the uploaded file with the parsing function
            parsed_result = parse_cv_images(uploaded_file)

            if "error" in parsed_result:
                return JsonResponse({"status": "error", "error": parsed_result["error"]}, status=500)

            # Return parsed data back to the frontend
            return JsonResponse({"status": "success", "data": parsed_result})

        except Exception as e:
            return JsonResponse({"status": "error", "error": str(e)}, status=500)

    return JsonResponse({"status": "error", "error": "No file uploaded"}, status=400)

# Parsing CV
def parse_cv(request):
    if request.method == 'POST' and request.FILES.get('file'):
        uploaded_file = request.FILES['file']

        # Parse uploaded file data
        parsing_result = parse_cv_images(uploaded_file)

        # Return the parsed data in JSON format
        return JsonResponse({"message": "Parsing completed", "parsed_data": parsing_result})
    else:
        return JsonResponse({"error": "File missing or invalid request"}, status=400)
