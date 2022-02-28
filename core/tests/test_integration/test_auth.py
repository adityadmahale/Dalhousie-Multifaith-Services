from rest_framework import status
import requests
import pytest


@pytest.mark.integration
class TestAuth:

    url = "http://localhost:8000/auth/users/"

    def test_blank_email(self):
        response = requests.post(
            self.url,
            {
                "email": "",
                "password": "password",
                "first_name": "firstname",
                "last_name": "lastname",
            },
        )
        assert response.status_code == status.HTTP_400_BAD_REQUEST

    def test_blank_password(self):
        response = requests.post(
            self.url,
            {
                "email": "abcd@xyz.com",
                "password": "",
                "first_name": "firstname",
                "last_name": "lastname",
            },
        )
        assert response.status_code == status.HTTP_400_BAD_REQUEST

    def test_valid_post(self):
        response = requests.post(
            self.url,
            {
                "email": "abcd@xyz.com",
                "password": "sdc32eeffs",
                "first_name": "firstname",
                "last_name": "lastname",
            },
        )
        assert response.status_code == status.HTTP_201_CREATED
