import { useEffect, useState } from "react";
import { getChaplains } from "../services/chaplains";
import { Line } from "rc-progress";

const Appointment = () => {
  const [chaplains, setChaplains] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const chaplains = await getChaplains();
      setChaplains(chaplains);
    };

    getData();
  });

  return (
    <div className="row">
      {chaplains.map((chaplain) => (
        <div className="col-12 col-md-4" key={chaplain.id}>
          <div className="card">
            {renderChaplainImage(chaplain)}
            {renderAvailability(chaplain.availability)}
            <div className="row description">{chaplain.description}</div>
            {renderButton(chaplain.availability)}
          </div>
        </div>
      ))}
    </div>
  );
};

const renderChaplainImage = (chaplain) => {
  return (
    <div className="row mb-3">
      <div className="col-12 col-xl-5 mb-3">
        <div className="apt-img-container">
          <img
            className="profile-img"
            src={process.env.PUBLIC_URL + chaplain.image}
            alt="profile"
          />
        </div>
      </div>
      <div className="col-12 col-xl-7 text-center align-self-center">
        <div style={{ fontWeight: "bold" }}>{chaplain.name}</div>
        <div className="title">{chaplain.title}</div>
      </div>
    </div>
  );
};

const renderAvailability = (availability) => {
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

const renderButton = (availability) => {
  let classes = "btn btn-primary mb-0";

  if (availability === 0) {
    classes += " disabled-button";
  }

  return (
    <div className="row">
      <button disabled={availability === 0} className={classes}>
        Book
      </button>
    </div>
  );
};

export default Appointment;
