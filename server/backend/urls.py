from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include('parser.urls')),  # Route the root URL to the parser app
    path('parser/', include('parser.urls')),
      # Keep the /parser/ route
]
