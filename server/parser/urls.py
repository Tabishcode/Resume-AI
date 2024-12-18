from django.urls import path
from . import views
from .views import parse_cv
from .views import handle_file_upload

urlpatterns = [
    path('', views.home, name='home'),
    path('parse/', parse_cv, name='parse_cv'),
    path('upload/', handle_file_upload, name='file_upload'),
]
