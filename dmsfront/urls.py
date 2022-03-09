from django.urls import path
from . import views

urlpatterns = [
    path("dalusers/", views.DalUserList.as_view(), name="daluserlist"),
    path("dalusers/<int:id>", views.DalUserDetail.as_view(), name="daluser"),
    path("chaplains/", views.ChaplainList.as_view(), name="chaplinlist"),
    path(
        "chaplains/<int:id>",
        views.ChaplainDetail.as_view(),
        name="chaplindetail",
    ),
    path(
        "appointments/<int:user_id>/<int:chaplain_id>",
        views.AppointmentList.as_view(),
        name="appointmentsget",
    ),
    path(
        "appointments/<int:id>",
        views.UserAppointmentDetails.as_view(),
        name="appointmentsdetail",
    ),
    path(
        "appointments/",
        views.UserAppointmentList.as_view(),
        name="appointments",
    ),
]
