from rest_framework import status
import requests
import pytest


@pytest.mark.integration
class TestTimeSheetAuth:

    url = "http://localhost:8000/auth/users/"
    chaplin_url = "http://localhost:8000/dmsfront/chaplains/"
    timesheet_url = "http://localhost:8000/dmsfront/timesheet/"

    def test_timesheetlist_post(self):

        # Adding chaplain
        chaplin_response = requests.post(
            self.url,
            {
                "email": "kalpit@dal.ca",
                "password": "group@10",
                "first_name": "Kalpit",
                "last_name": "Machhi",
                "is_staff": True,
            },
        )

        chaplin_id = chaplin_response.json()["id"]
        chaplain_data = {
            "user_id": id,
            "phone": "9024832051",
            "user": "kalpit",
            "religion": "Hindu",
            "description": "Certified clergy member.",
        }

        chaplin_response = requests.post(self.chaplin_url, chaplain_data)

        response = requests.get(self.timesheet_url + str(chaplin_id))
        assert response.status_code == status.HTTP_200_OK

    def test_timesheetdetail_get(self):

        chaplin_response = requests.post(
            self.url,
            {
                "email": "anas@dal.ca",
                "password": "group@10",
                "first_name": "Anas",
                "last_name": "Malvat",
                "is_staff": True,
            },
        )

        chaplin_id = chaplin_response.json()["id"]
        chaplain_data = {
            "user_id": id,
            "phone": "9024832051",
            "user": "Anas",
            "religion": "Hindu",
            "description": "Member",
        }

        chaplin_response = requests.post(self.chaplin_url, chaplain_data)

        response = requests.get(self.timesheet_url + str(chaplin_id))
        assert response.status_code == status.HTTP_200_OK
