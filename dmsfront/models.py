from django.db import models
from django.conf import settings


class DalUser(models.Model):
    user = models.OneToOneField(
        settings.AUTH_USER_MODEL, on_delete=models.CASCADE
    )
    phone = models.CharField(max_length=255)

    def __str__(self) -> str:
        return f"{self.user.first_name} {self.user.last_name}"

    class Meta:
        ordering = ["user__first_name", "user__last_name"]


class Chaplain(models.Model):
    user = models.OneToOneField(
        settings.AUTH_USER_MODEL, on_delete=models.CASCADE
    )
    phone = models.CharField(max_length=255)
    religion = models.CharField(max_length=255)
    description = models.TextField()

    def __str__(self) -> str:
        return f"{self.user.first_name} {self.user.last_name}"

    class Meta:
        ordering = ["user__first_name", "user__last_name"]


class Appointment(models.Model):
    slot = models.DateTimeField(null=True)
    user_id = models.ForeignKey(DalUser, on_delete=models.CASCADE)
    chaplain_id = models.ForeignKey(Chaplain, on_delete=models.CASCADE)
    status = models.CharField(max_length=255)


class Event(models.Model):
    event_title = models.CharField(max_length=150)
    event_date = models.DateTimeField()
    event_location = models.TextField()
    event_description = models.TextField()
    available_seats = models.PositiveSmallIntegerField()
    host_name = models.CharField(max_length=100)
    host_details = models.CharField(max_length=250)

    def __str__(self):
        return self.event_title


class TimeSheet(models.Model):
    chaplain_id = models.ForeignKey(Chaplain, on_delete=models.CASCADE)
    title = models.CharField(max_length=150)
    start = models.TextField(blank=False)
    end = models.TextField(blank=False)
