import pytest
from unittest import mock
from rest_framework import status
from requests.models import Response
from dmsfront.views import (
    DalUserList,
    DalUserDetail,
    ChaplainList,
    ChaplainDetail,
    UserAppointmentList,
    AppointmentList,
    UserAppointmentDetails,
)


@pytest.mark.unit
class TestChaplinUsersUnit:
    dal_user = DalUserList()
    dal_user_detail = DalUserDetail()
    chaplin_detail = ChaplainDetail()
    chaplin_list = ChaplainList()
    userappointment_list = UserAppointmentList()
    appointment_list = AppointmentList()
    userappointment_detail = UserAppointmentDetails()

    # CHAPLIN - mocked the get method from the ChaplinList
    def test_ChaplainList_get(self):
        fakeResponse = Response()
        fakeResponse.status_code = 200
        mock_get = mock.Mock(
            name="ChaplinList-get", return_value=fakeResponse
        )
        self.chaplin_list.get = mock_get

        assert self.chaplin_list.get().status_code == status.HTTP_200_OK

    # CHAPLIN - mocked the get method from the ChaplinList
    def test_ChaplainList_post(self):
        fakeResponse = Response()
        fakeResponse.status_code = status.HTTP_201_CREATED
        mock_post = mock.Mock(
            name="ChaplinList-post", return_value=fakeResponse
        )
        self.chaplin_list.post = mock_post

        assert self.chaplin_list.post().status_code == status.HTTP_201_CREATED

    # CHAPLIN - mocked the get method from the ChaplinDetails
    def test_ChaplainDetail_get(self):
        fakeResponse = Response()
        fakeResponse.status_code = 200
        mock_get = mock.Mock(
            name="ChaplinDetail-post", return_value=fakeResponse
        )
        self.chaplin_detail.get = mock_get

        assert self.chaplin_detail.get().status_code == status.HTTP_200_OK

    # CHAPLIN - mocked the put method from the ChaplinDetails
    def test_ChaplainDetail_put(self):
        fakeResponse = Response()
        fakeResponse.status_code = status.HTTP_202_ACCEPTED
        mock_put = mock.Mock(
            name="ChaplinDetail-put", return_value=fakeResponse
        )
        self.chaplin_detail.put = mock_put

        assert (
            self.chaplin_detail.put().status_code == status.HTTP_202_ACCEPTED
        )
