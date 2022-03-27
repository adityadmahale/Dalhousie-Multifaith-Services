import { Fragment, useEffect, useState } from "react";
import AppointmentCard from "./appointmentCard";
import { getAppointments, updateAppointment } from "../../services/appointment";
import Modal from "../common/modal";
import { toast } from "react-toastify";
import ListError from "../common/listError";

const AppointmentHistory = ({ user }) => {
  const [action, setAction] = useState("");
  const [appointments, setAppointments] = useState([]);
  const [selectedAppointment, setSelectedAppointment] = useState(null);

  useEffect(() => {
    const getData = async () => {
      let user_id, chaplain_id;
      if (user.user.is_staff) {
        user_id = 0;
        chaplain_id = user.id;
      } else {
        user_id = user.id;
        chaplain_id = 0;
      }
      const { data: dataAppointments } = await getAppointments(
        user_id,
        chaplain_id
      );
      setAppointments(dataAppointments);
    };
    getData();
  }, [user]);

  const onclick = (selected, action) => {
    setAction(action);
    setSelectedAppointment(selected);
  };

  const onConfirmClick = async (action, selectedAppointment) => {
    const originalAppointments = appointments;
    const appointmentsData = [...appointments];
    const index = appointmentsData.indexOf(selectedAppointment);
    appointmentsData[index] = { ...selectedAppointment };
    if (action === "confirm") {
      appointmentsData[index].status = "confirmed";
    } else if (action === "reject") {
      appointmentsData[index].status = "cancelled";
    }
    setAppointments(appointmentsData);
    try {
      await updateAppointment(appointmentsData[index]);
    } catch (ex) {
      if (
        ex.response &&
        ex.response.status >= 400 &&
        ex.response.status < 500
      ) {
        setAppointments(originalAppointments);
        toast.error(<ListError errors={Object.values(ex.response.data)} />);
      }
    }
  };

  return (
    <Fragment>
      {renderModal(action, onConfirmClick, selectedAppointment)}
      <div className="height600 ">
        <h3 className=" mb-4" style={{ color: "#727272" }}>
          Appointment History
        </h3>

        {appointments.map((appointment) => (
          <div key={appointment.id}>
            <AppointmentCard
              onclick={onclick}
              user={user}
              cardData={appointment}
            />
          </div>
        ))}
      </div>
    </Fragment>
  );
};

const renderModal = (action, onConfirmClick, selectedAppointment) => {
  return (
    <div>
      <Modal id="exampleModal5">
        <div className="text-center card-confirmation">
          <i className="ri-mental-health-fill" style={{ color: "#4d97d4" }}></i>
          <p className="card-text link">Are you sure you want to {action} ?</p>
          <div className="d-flex justify-content-center flex-wrap ">
            <div className="px-2">
              <button
                className="btn btn-primary"
                onClick={() => onConfirmClick(action, selectedAppointment)}
                style={{ width: "100px" }}
                data-bs-dismiss="modal"
              >
                Confirm
              </button>
            </div>
            <div>
              <button
                className="btn btn-primary"
                style={{ width: "100px" }}
                data-bs-dismiss="modal"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};
export default AppointmentHistory;
