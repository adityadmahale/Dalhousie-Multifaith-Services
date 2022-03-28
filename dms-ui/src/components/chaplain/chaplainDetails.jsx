import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getChaplain } from "../../services/chaplains";
import { getBookedSlots, bookSlot } from "../../services/slots";
import { isSlotBooked, isSlotEqual, isSlotInPast } from "../../utility/booking";
import CardConfirmation from "./cardConfirmation";
import CardDisplay from "./cardDisplay";
import Modal from "../common/modal";
import Slots from "./slots";
import { toast } from "react-toastify";
import ListError from "../common/listError";

const ChaplainDetails = ({ user }) => {
  const { id } = useParams();
  const [slot, setSlot] = useState(null);
  const [bookedSlots, setBookedSlots] = useState([]);
  const [display, setDisplay] = useState(false);
  const [chaplain, setChaplain] = useState({
    id: "",
    name: "",
    title: "",
    image: "",
    availability: "",
    description: "",
  });

  useEffect(() => {
    const getData = async () => {
      const dataChaplain = await getChaplain(id);
      setChaplain(dataChaplain);
      const { data: dataBookedSlots } = await getBookedSlots(id);
      setBookedSlots(dataBookedSlots);
    };
    getData();
  }, [id]);

  const handleSlotSelect = (selectedSlot) => {
    if (isSlotEqual(slot, selectedSlot)) {
      setSlot(null);
      return;
    }

    if (isSlotInPast(selectedSlot) || isSlotBooked(selectedSlot, bookedSlots)) {
      return;
    }

    setSlot(selectedSlot);
  };

  const handleConfirmClick = async () => {
    const originalSlots = bookedSlots;
    setDisplay(true);
    setSlot(null);

    const slots = [...bookedSlots, { slot, status: "pending" }];
    setBookedSlots(slots);
    try {
      await bookSlot(user.id, id, slot);
    } catch (ex) {
      if (
        ex.response &&
        ex.response.status >= 400 &&
        ex.response.status < 500
      ) {
        setBookedSlots(originalSlots);
        toast.error(<ListError errors={Object.values(ex.response.data)} />);
      }
    }
  };

  return (
    <div className="m-2">
      {renderModal(display, slot, chaplain, handleConfirmClick, user)}
      <div className="row">
        <div className="col-12 col-md-8 col-lg-4">
          {ChaplainImage(chaplain)}
        </div>
        <div className="col-12 col-md-4 col-lg-8 align-self-center">
          {renderButton(chaplain.availability, slot)}
        </div>
      </div>
      <div className="row description p-2">{chaplain.description}</div>
      <Slots
        selected={slot}
        onSlotSelect={handleSlotSelect}
        bookedSlots={bookedSlots}
      />
    </div>
  );
};

const renderModal = (display, slot, chaplain, handleModalDisplay, user) => {
  return (
    <Modal id="exampleModal">
      {display ? (
        <CardConfirmation />
      ) : (
        <CardDisplay
          slot={slot}
          name={chaplain.name}
          onClick={handleModalDisplay}
          user={user}
        />
      )}
    </Modal>
  );
};

const ChaplainImage = (chaplain) => {
  return (
    <div className="row mb-3">
      <div className="col-12 col-md-6 col-lg-4 mb-3">
        <div className="apt-img-container">
          <img
            className="profile-img"
            src={process.env.PUBLIC_URL + chaplain.image}
            alt="profile"
          />
        </div>
      </div>
      <div className="col-12 col-md-6 col-lg-8 text-center align-self-center">
        <div style={{ fontWeight: "bold", fontSize: "30px" }}>
          {chaplain.name}
        </div>
        <div className="title">{chaplain.title}</div>
      </div>
    </div>
  );
};

const renderButton = (availability, slot) => {
  let classes = "btn btn-primary btn-detail";

  if (availability === 0) {
    classes += " disabled-button";
  }

  return (
    <button
      disabled={availability === 0 || slot === null}
      className={classes}
      style={{ maxWidth: "300px" }}
      data-bs-toggle="modal"
      data-bs-target="#exampleModal"
    >
      Book Appointment
    </button>
  );
};

export default ChaplainDetails;
