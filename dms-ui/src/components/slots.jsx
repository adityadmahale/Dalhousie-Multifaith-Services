import React from "react";
import { getCurrentWeekDates } from "../utility/booking";

const Slots = () => {
  const dates = getCurrentWeekDates();

  return (
    <div className="row">
      {dates.map((date) => (
        <div key={date} className="col-12 col-md-6 col-lg-3 p-0">
          {renderSlot(date)}
        </div>
      ))}
    </div>
  );
};

const renderSlot = (date) => {
  const day = date.getDate();
  const month = date.toLocaleString("default", { month: "long" });
  const year = date.getFullYear();
  const startTime = date.getHours();
  return (
    <div className="slot-available text-center">
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
