import http from "./httpService";

const appointmentAPIEndpoint = "/dmsfront/appointments/";

export const getBookedSlots = (chaplainId) => {
  return http.get(`${appointmentAPIEndpoint}0/${chaplainId}`);
};

export function bookSlot(user_id, chaplain_id, slot) {
  return http.post(appointmentAPIEndpoint, {
    user_id: user_id,
    chaplain_id: chaplain_id,
    slot: slot,
    status: "pending",
  });
}
