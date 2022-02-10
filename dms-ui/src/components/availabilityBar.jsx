import React from "react";
import { Line } from "rc-progress";

const AvailabilityBar = ({ availability }) => {
  return (
    <div className="row mb-2">
      <div className="p-0 mb-1 fw-bold">Availability</div>
      <Line
        strokeColor={getStrokeColor(availability)}
        strokeWidth={4}
        percent={availability}
        trailWidth={4}
        className="p-0"
      />
    </div>
  );
};

const getStrokeColor = (availability) => {
  if (availability <= 33) {
    return "#e02e22";
  }
  if (availability > 75) {
    return "#23b81c";
  }

  return "#ebaa13";
};

export default AvailabilityBar;
