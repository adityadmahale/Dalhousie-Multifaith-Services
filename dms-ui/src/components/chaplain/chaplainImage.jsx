import React from "react";

const ChaplainImage = ({ chaplain }) => {
  return (
    <div className="row mb-3">
      <div className="col-12 col-xl-5 mb-3">
        <div className="apt-img-container">
          <img
            className="profile-img"
            src={
              chaplain.user.image
                ? process.env.REACT_APP_API_URL + chaplain.user.image.image
                : process.env.PUBLIC_URL + "/profile_holder.png"
            }
            alt="profile"
          />
        </div>
      </div>
      <div className="col-12 col-xl-7 text-center align-self-center">
        <div style={{ fontWeight: "bold" }}>
          {`${chaplain.user.first_name} ${chaplain.user.last_name}`}
        </div>
        <div className="title">{chaplain.religion}</div>
      </div>
    </div>
  );
};

export default ChaplainImage;
