import http from "./httpService";

const timesheetAPIEndpoint = "/dmsfront/timesheet";

export const getTimesheet = async (chaplainId) => {
  return http.get(`${timesheetAPIEndpoint}/${chaplainId}`);
};

export const createTimesheet = (timesheet) => {
  return http.post(`${timesheetAPIEndpoint}/`, {
    chaplain_id: timesheet.chaplain_id,
    title: timesheet.title,
    start: timesheet.start,
    end: timesheet.end,
  });
};
