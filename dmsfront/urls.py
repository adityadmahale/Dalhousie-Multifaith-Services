from django.urls import path
from . import views

# Routes for the dmsfront application
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
    path("events/", views.get_events),
    path("addevent/", views.add_event),
    path("events/<int:id>", views.get_event),
    path("events/<int:id>/book", views.book_event),
    path("timesheet/", views.TimeSheetList.as_view(), name="timesheet"),
    path(
        "timesheet/<int:chaplain_id>",
        views.TimeSheetDetail.as_view(),
        name="timesheet_detail",
    )

]
