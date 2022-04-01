from rest_framework import status
import requests
import pytest


@pytest.mark.integration
class TestDalUsersAuth:

    url = "http://localhost:8000/auth/users/"
    url = "http://localhost:8000/auth/users/"
    dal_user_url = "http://localhost:8000/dmsfront/dalusers/"
    chaplin_url = "http://localhost:8000/dmsfront/chaplains/"
    events_url = "http://localhost:8000/dmsfront/"
    appointment_url = "http://localhost:8000/dmsfront/appointments/"

    # Daluser-test adding daluser with correct data
    def test_dalUser_post(self):
        user_response = requests.post(
            self.url,
            {
                "email": "harshit@lakha.ca",
                "password": "group@123",
                "first_name": "harshit",
                "last_name": "lakhani",
                "is_staff": False,
            },
        )
        id = user_response.json()["id"]
        data = {"user_id": id, "phone": "9024538293", "user": "harshit"}
        response = requests.post(self.dal_user_url, data)
        assert response.status_code == status.HTTP_201_CREATED

    # Daluser-test adding daluser with correct data
    def test_dalUserDetail_get(self):
        # user added
        user_response = requests.post(
            self.url,
            {
                "email": "mvdfjne@lakha.ca",
                "password": "group@123",
                "first_name": "harshit",
                "last_name": "lakhani",
                "is_staff": False,
            },
        )
        id = user_response.json()["id"]
        data = {"user_id": id, "phone": "9024538293", "user": "harshit"}
        # daluser added
        daluser_response = requests.post(self.dal_user_url, data)
        response = requests.get(self.dal_user_url + str(id))
        assert response.json()["id"] == daluser_response.json()["id"]
