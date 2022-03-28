import { useEffect, useState } from "react";
import { getChaplains } from "../../services/chaplains";
import AvailabilityBar from "./availabilityBar";
import ChaplainImage from "./chaplainImage";
import { useNavigate } from "react-router-dom";

const ChaplainList = () => {
  const [chaplains, setChaplains] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const getData = async () => {
      const chaplains = await getChaplains();
      setChaplains(chaplains);
    };

    getData();
  });

  const handleClick = (chaplainId) => {
    navigate(`/chaplains/${chaplainId}`);
  };

  return (
    <div className="row">
      {chaplains.map((chaplain) => (
        <div className="col-12 col-md-4" key={chaplain.id}>
          <div className="card">
            <ChaplainImage chaplain={chaplain} />
            <AvailabilityBar availability={chaplain.availability} />
            <div className="row description">{chaplain.description}</div>
            {renderButton(chaplain.availability, handleClick, chaplain.id)}
          </div>
        </div>
      ))}
    </div>
  );
};

const renderButton = (availability, onClick, chaplainId) => {
  let classes = "btn btn-primary mb-0";

  if (availability === 0) {
    classes += " disabled-button";
  }

  return (
    <div className="row">
      <button
        disabled={availability === 0}
        className={classes}
        onClick={() => onClick(chaplainId)}
      >
        Book
      </button>
    </div>
  );
};

export default ChaplainList;
