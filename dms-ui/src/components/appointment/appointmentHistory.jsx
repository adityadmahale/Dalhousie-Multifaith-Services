import { Fragment, useEffect, useState } from "react";
import AppointmentCard from "./appointmentCard";
import { getAppointments } from "../../services/appointment";
import Modal from "../common/modal";
const AppointmentHistory = ({user}) => {
	const [display, setDisplay] = useState(false);
	const [action, setAction] = useState("");
	const [appointment, setAppointment] = useState([]); //updated data => state
	const [appointmentId, setAppointmentId] = useState("");
	useEffect(() => {
		setAppointment(getAppointments());
    console.log(user);
	}, []);
	const onclick = (id, action) => {
		setAction(action);
		setDisplay(true);
		setAppointmentId(id);
	};
	const onConfirmClick = () => {
		const data = appointment.filter((item) => appointmentId === item.id)[0];
		if (action === "confirm") {
			data["status"] = "confirmed";
		} else if (action === "reject") {
			data["status"] = "cancelled";
		}
		setDisplay(false);
	};
	const onRejectClick = () => {
		setDisplay(false);
	};
	return (
		<Fragment>
			{renderModal(display, action, onConfirmClick, onRejectClick)}
			<div className="height600 ">
				<h3 className=" mb-4" style={{ color: "#727272" }}>
					Appointment History
				</h3>

				{appointment.map((appointment, index) => (
					<div key={index}>
						<AppointmentCard onclick={onclick} user = {user} cardData={appointment} />
					</div>
				))}
			</div>
		</Fragment>
	);
};

const renderModal = (display, action, onConfirmClick, onRejectClick) => {
	return (
		<div>
			{display && (
				<Modal id="exampleModal3">
					<div className="text-center card-confirmation">
						<i
							className="ri-mental-health-fill"
							style={{ color: "#4d97d4" }}
						></i>
						<p className="card-text link">
							Are you sure you want to {action} ?
						</p>
						<div className="d-flex justify-content-center flex-wrap ">
							<div className="px-2">
								<button
									className="btn btn-primary"
									onClick={onConfirmClick}
									style={{ width: "100px" }}
									data-bs-dismiss="modal"
								>
									Confirm
								</button>
							</div>
							<div>
								<button
									className="btn btn-primary"
									onClick={onRejectClick}
									style={{ width: "100px" }}
									data-bs-dismiss="modal"
								>
									Cancel
								</button>
							</div>
						</div>
					</div>
				</Modal>
			)}
		</div>
	);
};
export default AppointmentHistory;
