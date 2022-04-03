from django.urls import path
from . import views

# user related routes
urlpatterns = [
    path("recovery/", views.recovery),
    path("name/", views.update_name),
    path("image/", views.UserImageView.as_view()),
]
