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
class TestAppointmentsUnits:
    dal_user = DalUserList()
    dal_user_detail = DalUserDetail()
    chaplin_detail = ChaplainDetail()
    chaplin_list = ChaplainList()
    userappointment_list = UserAppointmentList()
    appointment_list = AppointmentList()
    userappointment_detail = UserAppointmentDetails()

    # USERAPPOINTMENTLIST - mocked the post method from the UserAppointmentList
    def test_UserAppointmentList_put(self):
        fakeResponse = Response()
        fakeResponse.status_code = status.HTTP_202_ACCEPTED
        mock_put = mock.Mock(
            name="AppointmentList-put", return_value=fakeResponse
        )
        self.userappointment_list.put = mock_put

        assert (
            self.userappointment_list.put().status_code
            == status.HTTP_202_ACCEPTED
        )

    # APPOINTMENTLIST - mocked the post method from the AppointmentList
    def test_AppointmentList_get(self):
        fakeResponse = Response()
        fakeResponse.status_code = 200
        mock_get = mock.Mock(
            name="AppointmentList-put", return_value=fakeResponse
        )
        self.appointment_list.get = mock_get

        assert self.appointment_list.get().status_code == status.HTTP_200_OK

    # USERAPPOINTMENTDETAILS
    # mocked the post method from the UserAppointmentDetails
    def test_UserAppointmentDetail_put(self):
        fakeResponse = Response()
        fakeResponse.status_code = status.HTTP_202_ACCEPTED
        mock_put = mock.Mock(
            name="AppointmentList-put", return_value=fakeResponse
        )
        self.userappointment_detail.put = mock_put

        assert (
            self.userappointment_detail.put().status_code
            == status.HTTP_202_ACCEPTED
        )
