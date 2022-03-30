import { useContext } from "react";
import ChaplainImage from "./chaplainImage";
import { useNavigate } from "react-router-dom";
import ChaplainContext from "../../context/chaplainContext";

const ChaplainList = () => {
  const navigate = useNavigate();
  const chaplainContext = useContext(ChaplainContext);

  const handleClick = (chaplain) => {
    navigate(`/chaplains/${chaplain.id}`, {
      state: {
        first_name: chaplain.user.first_name,
        last_name: chaplain.user.last_name,
        religion: chaplain.religion,
        description: chaplain.description,
        image: chaplain.user.image,
      },
    });
  };

  return (
    <div className="row">
      {chaplainContext.chaplains.map((chaplain) => (
        <div className="col-12 col-md-4" key={chaplain.id}>
          <div className="card">
            <ChaplainImage chaplain={chaplain} />
            <div className="row description">{chaplain.description}</div>
            {renderButton(handleClick, chaplain)}
          </div>
        </div>
      ))}
    </div>
  );
};

const renderButton = (onClick, chaplain) => {
  let classes = "btn btn-primary mb-0";

  return (
    <div className="row">
      <button className={classes} onClick={() => onClick(chaplain)}>
        Book
      </button>
    </div>
  );
};

export default ChaplainList;
