import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getChaplain } from "../services/chaplains";
import { getBookedSlots } from "../services/slots";
import { isSlotBooked, isSlotEqual, isSlotInPast } from "../utility/booking";
import Slots from "./slots";

const ChaplainDetails = () => {
  const { id } = useParams();
  const [slot, setSlot] = useState(null);
  const [bookedSlots, setBookedSlots] = useState([]);
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
      const dataBookedSlots = await getBookedSlots(new Date(), id);
      setBookedSlots(dataBookedSlots);
    };

    getData();
  });

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

  const handleButtonClick = (slot) => {
    const slotTime =
      slot.toISOString().split("T")[0] +
      " " +
      slot.toTimeString().split(" ")[0];
  };

  return (
    <div className="m-2">
      <div className="row">
        <div className="col-12 col-md-8 col-lg-4">
          {ChaplainImage(chaplain)}
        </div>
        <div className="col-12 col-md-4 col-lg-8 align-self-center">
          {renderButton(chaplain.availability, slot, handleButtonClick)}
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

const renderButton = (availability, slot, onClick) => {
  let classes = "btn btn-primary btn-detail";

  if (availability === 0) {
    classes += " disabled-button";
  }

  return (
    <button
      disabled={availability === 0 || slot === null}
      className={classes}
      style={{ maxWidth: "300px" }}
      onClick={() => onClick(slot)}
    >
      Book Appointment
    </button>
  );
};

export default ChaplainDetails;
