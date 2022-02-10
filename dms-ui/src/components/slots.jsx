import React from "react";
import {
  getCurrentWeekDates,
  isSlotEqual,
  isSlotInPast,
} from "../utility/booking";

const Slots = ({ selected, onSlotSelect }) => {
  const dates = getCurrentWeekDates();

  return (
    <div className="row">
      {dates.map((date) => (
        <div
          key={date}
          className="col-12 col-md-6 col-lg-3 p-0"
          onClick={() => onSlotSelect(date)}
        >
          {renderSlot(date, selected)}
        </div>
      ))}
    </div>
  );
};

const getClasses = (slot, selectedSlot) => {
  let classes = "slot-available text-center ";

  if (isSlotInPast(slot)) {
    classes += "past-slot";
  } else if (isSlotEqual(slot, selectedSlot)) {
    classes += "selected-slot";
  }

  return classes;
};

const renderSlot = (date, selected) => {
  const day = date.getDate();
  const month = date.toLocaleString("default", { month: "long" });
  const year = date.getFullYear();
  return (
    <div className={getClasses(date, selected)}>
      <p>{`${day} ${month}, ${year}`}</p>
      <p>{getSlotRange(date.getHours())}</p>
    </div>
  );
};

const getSlotRange = (time) => {
  const startTime = getTime(time);
  const endTime = getTime(time + 1);
  return `${startTime} - ${endTime}`;
};

const getTime = (time) => {
  if (time === 12) {
    return "12 PM";
  }
  if (time > 12) {
    return `${time - 12} PM`;
  }

  return `${time} AM`;
};

export default Slots;
