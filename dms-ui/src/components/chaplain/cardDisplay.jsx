import React from "react";
import { getSlotRange } from "../../utility/booking";

const CardDisplay = ({ slot, name, onClick }) => {
  if (slot === null) return null;

  const day = slot.getDate();
  const month = slot.getMonth();
  const year = slot.getFullYear();

  return (
    <div className="text-center card-confirmation">
      <i className="ri-mental-health-fill" style={{ color: "#4d97d4" }}></i>
      <p className="card-text">{name}</p>
      <p className="link">
        {`${day}/${month}/${year}`} - {getSlotRange(slot.getHours())}
      </p>
      <button
        className="btn btn-primary"
        onClick={onClick}
        style={{ width: "300px" }}
      >
        Send Request
      </button>
    </div>
  );
};

export default CardDisplay;
