from django.urls import path
from . import views

urlpatterns = [
    path('dalusers/', views.DalUserList.as_view()),
    path('dalusers/<int:id>', views.DalUserDetail.as_view()),
    path('chaplains/', views.ChaplainList.as_view()),
    path('chaplains/<int:id>', views.ChaplainDetail.as_view()),
]
