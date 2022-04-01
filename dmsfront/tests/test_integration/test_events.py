from rest_framework import status
import requests
import pytest
from django.db import models
import datetime


@pytest.mark.integration
class TestEventsAuth:

    url = "http://localhost:8000/auth/users/"
    dal_user_url = "http://localhost:8000/dmsfront/dalusers/"
    chaplin_url = "http://localhost:8000/dmsfront/chaplains/"
    events_url = "http://localhost:8000/dmsfront/"
    appointment_url = "http://localhost:8000/dmsfront/appointments/"

    # EVENTS-test on getting all the events
    def test_events_get(self):
        # events
        response = requests.get(self.events_url + "events/")
        assert response.status_code == status.HTTP_200_OK

    # EVENTS-test on adding an events
    def test_addEvents_post(self):
        # events
        dateTime = models.DateTimeField(
            default=datetime.datetime.now, blank=True
        )
        response = requests.post(
            (self.events_url + "addevent/"),
            {
                "event_title": "abcdbd",
                "event_date": dateTime,
                "event_location": "svhsjnv",
                "event_description": "sdcjdshvn",
                "available_seats": 5,
                "host_name": "dvhdfnvf",
                "host_details": "dchdbfchfd",
            },
        )

        assert response.status_code == status.HTTP_200_OK

    # EVENTS-test on getting an events
    def test_Particularevent_get(self):
        # events
        dateTime = models.DateTimeField(
            default=datetime.datetime.now, blank=True
        )
        response = requests.post(
            (self.events_url + "addevent/"),
            {
                "event_title": "abcdbd",
                "event_date": dateTime,
                "event_location": "svhsjnv",
                "event_description": "sdcjdshvn",
                "available_seats": 5,
                "host_name": "dvhdfnvf",
                "host_details": "dchdbfchfd",
            },
        )

        assert response.status_code == status.HTTP_200_OK
