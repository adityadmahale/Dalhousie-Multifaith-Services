import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getChaplain } from "../services/chaplains";
import Slots from "./slots";

const ChaplainDetails = () => {
  const { id } = useParams();
  const [slot, selectSlot] = useState("");
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
      const data = await getChaplain(id);
      setChaplain(data);
    };

    getData();
  });

  return (
    <div className="m-2">
      <div className="row">
        <div className="col-12 col-md-8 col-lg-4">
          {ChaplainImage(chaplain)}
        </div>
        <div className="col-12 col-md-4 col-lg-8 align-self-center">
          {renderButton(chaplain.availability)}
        </div>
      </div>
      <div className="row description p-2">{chaplain.description}</div>
      <Slots />
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

const renderButton = (availability) => {
  let classes = "btn btn-primary btn-detail";

  if (availability === 0) {
    classes += " disabled-button";
  }

  return (
    <button
      disabled={availability === 0}
      className={classes}
      style={{ maxWidth: "300px" }}
    >
      Book Appointment
    </button>
  );
};

export default ChaplainDetails;
