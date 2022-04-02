from rest_framework import status
import requests
import pytest


@pytest.mark.integration
class TestAppointmentsAuth:

    url = "http://localhost:8000/auth/users/"
    dal_user_url = "http://localhost:8000/dmsfront/dalusers/"
    chaplin_url = "http://localhost:8000/dmsfront/chaplains/"
    events_url = "http://localhost:8000/dmsfront/"
    appointment_url = "http://localhost:8000/dmsfront/appointments/"

    # APPOINTMNETS-test on appointment booking
    def test_bookappointments_post(self):
        # daluser added
        daluser_response = requests.post(
            self.url,
            {
                "email": "hari@lakha.ca",
                "password": "group@123",
                "first_name": "harshit",
                "last_name": "lakhani",
                "is_staff": False,
            },
        )
        daluser_id = daluser_response.json()["id"]
        data = {"user_id": id, "phone": "9024538293", "user": "harshit"}
        requests.post(self.dal_user_url, data)

        # chaplin added
        chaplin_response = requests.post(
            self.url,
            {
                "email": "ramesh@lakha.ca",
                "password": "group@123",
                "first_name": "aditya",
                "last_name": "mahale",
                "is_staff": True,
            },
        )
        chaplin_id = chaplin_response.json()["id"]
        data = {
            "user_id": id,
            "phone": "9024538293",
            "user": "harshit",
            "religion": "Hindu",
            "description": "i am a chaplin",
        }
        # chaplin added
        requests.post(self.chaplin_url, data)

        response = requests.get(
            self.appointment_url + str(daluser_id) + "/" + str(chaplin_id)
        )
        assert response.status_code == status.HTTP_200_OK
