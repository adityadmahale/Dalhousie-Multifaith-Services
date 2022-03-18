import React from "react";
import "react-circular-progressbar/dist/styles.css";
import { useState } from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";

const Scorecard = () => {
  const percentage = [23, 65, 95];
  const bgColor = ["#FFBEBE", "#FFF6BE", "#DEFFBE"];
  const progressColor = ["#FF5555", "#FED261", "#8DE022"];
  let index = 2
  ;

  return (
    <div className="container bg-white">
      <div className="box-card">
        <div className="row">
          <div className="col-3">
            <p>Latest Score</p>
            <br />
          </div>
          <div className="col-9">
            <p>History</p>
            <br />
          </div>
        </div>
        <div className="row">
          <div className="col-2">
            <CircularProgressbar
              value={percentage[index]}
              text={percentage[index] + ""}
              background
              backgroundPadding={5}
              strokeWidth={3}
              styles={buildStyles({
                backgroundColor: bgColor[index],
                textColor: progressColor[index],
                textSize: "20px",
                pathColor: progressColor[index],
                trailColor: "transparent",
              })}
            />
          </div>
          <div className="col-10"></div>
        </div>
      </div>
    </div>
  );
};

export default Scorecard;
