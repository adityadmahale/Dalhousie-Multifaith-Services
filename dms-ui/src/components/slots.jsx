import React from "react";
import { getSlotRange } from "../utility/booking";

import {
  getCurrentWeekDates,
  isSlotEqual,
  isSlotInPast,
  isSlotBooked,
} from "../utility/booking";

const Slots = ({ selected, onSlotSelect, bookedSlots }) => {
  const dates = getCurrentWeekDates();

  return (
    <div className="row">
      {dates.map((date) => (
        <div
          key={date}
          className="col-12 col-md-6 col-lg-3 p-0"
          onClick={() => onSlotSelect(date)}
        >
          {renderSlot(date, selected, bookedSlots)}
        </div>
      ))}
    </div>
  );
};

const getClasses = (slot, selectedSlot, bookedSlots) => {
  let classes = "slot-available text-center ";

  if (isSlotInPast(slot) || isSlotBooked(slot, bookedSlots)) {
    classes += "unavailable-slot";
  } else if (isSlotEqual(slot, selectedSlot)) {
    classes += "selected-slot";
  }

  return classes;
};

const renderSlot = (date, selected, bookedSlots) => {
  const day = date.getDate();
  const month = date.toLocaleString("default", { month: "long" });
  const year = date.getFullYear();
  return (
    <div className={getClasses(date, selected, bookedSlots)}>
      <p>{`${day} ${month}, ${year}`}</p>
      <p>{getSlotRange(date.getHours())}</p>
    </div>
  );
};

export default Slots;
