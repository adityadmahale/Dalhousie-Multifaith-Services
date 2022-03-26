import http from "./httpService";

const appointmentAPIEndpoint = "/dmsfront/appointments/";

export const getAppointments = (userId, chaplainId) => {
  return http.get(`${appointmentAPIEndpoint}${userId}/${chaplainId}`);
};
