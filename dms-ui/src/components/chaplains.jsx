import { useEffect, useState } from "react";
import { getChaplains } from "../services/chaplains";
import AvailabilityBar from "./availabilityBar";
import ChaplainImage from "./chaplainImage";

const ChaplainList = () => {
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
            <ChaplainImage chaplain={chaplain} />
            <AvailabilityBar availability={chaplain.availability} />
            <div className="row description">{chaplain.description}</div>
            {renderButton(chaplain.availability)}
          </div>
        </div>
      ))}
    </div>
  );
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

export default ChaplainList;
