import React from "react";

const ChaplainImage = ({ chaplain }) => {
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

export default ChaplainImage;
