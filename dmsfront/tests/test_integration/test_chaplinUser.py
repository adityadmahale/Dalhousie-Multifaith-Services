from rest_framework import status
import requests
import pytest


@pytest.mark.integration
class TestChaplinAuth:

    url = "http://localhost:8000/auth/users/"
    dal_user_url = "http://localhost:8000/dmsfront/dalusers/"
    chaplin_url = "http://localhost:8000/dmsfront/chaplains/"
    events_url = "http://localhost:8000/dmsfront/"
    appointment_url = "http://localhost:8000/dmsfront/appointments/"

    # ChaplainList-test adding chaplin with correct data
    def test_chaplinList_post(self):
        # user added
        user_response = requests.post(
            self.url,
            {
                "email": "aditya@lakha.ca",
                "password": "group@123",
                "first_name": "aditya",
                "last_name": "mahale",
                "is_staff": True,
            },
        )
        id = user_response.json()["id"]
        data = {
            "user_id": id,
            "phone": "9024538293",
            "user": "harshit",
            "religion": "Hindu",
            "description": "i am a chaplin",
        }
        # chaplin added
        response = requests.post(self.chaplin_url, data)
        assert response.status_code == status.HTTP_201_CREATED

    # ChaplainList-test adding chaplin with correct data
    def test_chaplinList_get(self):
        # user added
        user_response = requests.post(
            self.url,
            {
                "email": "kalpit@lakha.ca",
                "password": "group@123",
                "first_name": "kalpit",
                "last_name": "mahale",
                "is_staff": True,
            },
        )
        id = user_response.json()["id"]
        data = {
            "user_id": id,
            "phone": "9024538293",
            "user": "harshit",
            "religion": "Hindu",
            "description": "i am a chaplin",
        }
        requests.post(self.chaplin_url, data)

        # chaplin get by id
        length = len(requests.get(self.chaplin_url).json())
        assert length != 0

    # ChaplainDetail-test getting chaplin detail with correct id
    def test_chaplinDetail_get(self):
        # user added
        user_response = requests.post(
            self.url,
            {
                "email": "anas@lakha.ca",
                "password": "group@123",
                "first_name": "anas",
                "last_name": "mahale",
                "is_staff": True,
            },
        )
        id = user_response.json()["id"]
        data = {
            "user_id": id,
            "phone": "9024538293",
            "user": "anas",
            "religion": "Hindu",
            "description": "i am a chaplin",
        }
        # chaplin added
        chaplin_response = requests.post(self.chaplin_url, data)

        response = requests.get(self.chaplin_url + str(id))
        assert response.json()["id"] == chaplin_response.json()["id"]
