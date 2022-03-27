import http from "./httpService";

const appointmentAPIEndpoint = "/dmsfront/appointments/";

export const getAppointments = (userId, chaplainId) => {
  return http.get(`${appointmentAPIEndpoint}${userId}/${chaplainId}`);
};

export const updateAppointment = (appointment, status) => {
  return http.put(`${appointmentAPIEndpoint}${appointment.id}`, {
    user_id: appointment.user_id,
    chaplain_id: appointment.chaplain_id,
    slot: appointment.slot,
    status: status,
  });
};
