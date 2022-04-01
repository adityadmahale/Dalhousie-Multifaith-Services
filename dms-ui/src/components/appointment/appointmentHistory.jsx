import { Fragment, useContext, useState } from "react";
import AppointmentCard from "./appointmentCard";
import Modal from "../common/modal";
import AppointmentContext from "../../context/appointmentContext";

const AppointmentHistory = ({ user }) => {
  const [action, setAction] = useState("");
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const appointmentContext = useContext(AppointmentContext);

  const onclick = (selected, userAction) => {
    setAction(userAction);
    setSelectedAppointment(selected);
  };

  return (
    <Fragment>
      {renderModal(
        action,
        appointmentContext.handleConfirmClick,
        selectedAppointment
      )}
      <div className="height600 ">
        <h3 className=" mb-4" style={{ color: "#727272" }}>
          Appointment History
        </h3>

        {appointmentContext.appointments.map((appointment) => (
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

const renderModal = (action, handleConfirmClick, selectedAppointment) => {
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
                onClick={() => handleConfirmClick(action, selectedAppointment)}
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
