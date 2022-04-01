from rest_framework import status
import requests
import pytest


@pytest.mark.integration
class TestChaplinUsersAuth:

    url = "http://localhost:8000/auth/users/"
    url = "http://localhost:8000/auth/users/"
    dal_user_url = "http://localhost:8000/dmsfront/dalusers/"
    chaplin_url = "http://localhost:8000/dmsfront/dalusers/"
    events_url = "http://localhost:8000/dmsfront/"
    appointment_url = "http://localhost:8000/dmsfront/appointments/"

    # ChaplinUser-test adding chaplin user with correct data
    def test_ChaplinUser_post(self):
        user_response = requests.post(
            self.url,
            {
                "email": "harshitshhcdsb@lakha.ca",
                "password": "group@123",
                "first_name": "harshit",
                "last_name": "lakhani",
                "is_staff": False,
            },
        )
        id = user_response.json()["id"]
        data = {"user_id": id, "phone": "9024538293", "user": "apexa"}
        response = requests.post(self.chaplin_url, data)
        assert response.status_code == status.HTTP_201_CREATED

    # ChaplinUser-test adding chaplin user with correct data
    def test_ChaplinUserDetail_get(self):
        # user added
        user_response = requests.post(
            self.url,
            {
                "email": "mvdfjnescbshdb@lakha.ca",
                "password": "group@123",
                "first_name": "harshit",
                "last_name": "lakhani",
                "is_staff": False,
            },
        )
        id = user_response.json()["id"]
        data = {"user_id": id, "phone": "9024538293", "user": "sneha"}
        # daluser added
        daluser_response = requests.post(self.chaplin_url, data)
        response = requests.get(self.chaplin_url + str(id))
        assert response.json()["id"] == daluser_response.json()["id"]
