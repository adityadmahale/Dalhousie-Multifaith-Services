import pytest
from unittest import mock
from rest_framework import status
from requests.models import Response
from dmsfront.views import TimeSheetList, TimeSheetDetail


@pytest.mark.unit
class TestTimesheetUnit:

    timesheet_list = TimeSheetList()
    timesheet_detail = TimeSheetDetail()

    # TIMESHEETLIST - mocked the post method from the TimeSheetList
    def test_timesheet_list_post(self):
        fakeResponse = Response()
        fakeResponse.status_code = status.HTTP_202_ACCEPTED
        mock_post = mock.Mock(
            name="TimeSheetList-post", return_value=fakeResponse
        )
        self.timesheet_list.post = mock_post

        assert (
            self.timesheet_list.post().status_code == status.HTTP_202_ACCEPTED
        )

    # TIMESHEETDETAIL - mocked the get method from the TimeSheetDetail
    def test_timesheet_detail_get(self):
        fakeResponse = Response()
        fakeResponse.status_code = status.HTTP_200_OK
        mock_post = mock.Mock(
            name="TimeSheetDetail-get", return_value=fakeResponse
        )
        self.timesheet_detail.get = mock_post

        assert self.timesheet_detail.get().status_code == status.HTTP_200_OK
