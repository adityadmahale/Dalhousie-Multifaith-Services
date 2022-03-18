import { useEffect, useState } from "react";
import AppointmentCard from "./appointmentCard";
import { getAppointments } from "../../services/appointment";
const AppointmentHistory = () => {
  const [appointment, setAppointment] = useState([]);
  useEffect(() => {
    setAppointment(getAppointments());
  }, []);
  return (
    <>
      <h3 className=" mb-4" style={{ color: "#727272" }}>
        Appointment History
      </h3>
      {appointment.map((appointment) => (
        <AppointmentCard cardData={appointment} />
      ))}
    </>
  );
};
export default AppointmentHistory;
