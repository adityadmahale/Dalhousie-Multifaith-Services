from django.urls import path
from . import views

urlpatterns = [
    path("recovery/", views.recovery),
]
