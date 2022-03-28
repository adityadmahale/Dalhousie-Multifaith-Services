const AppointmentCard = ({ cardData, onclick, user }) => {
  const slotDate = new Date(cardData.slot);
  const date = slotDate.toLocaleDateString("en-US");
  const time = slotDate.toLocaleTimeString();
  let firstName, lastName;
  if (user.user.is_staff) {
    firstName = cardData.daluser.user.first_name;
    lastName = cardData.daluser.user.last_name;
  } else {
    firstName = cardData.chaplain.user.first_name;
    lastName = cardData.chaplain.user.last_name;
  }
  return (
    <>
      <div className="d-flex flex-column ">
        <div
          className={`row appointment-card card ${
            cardData.status === "cancelled" ? "text-secondary" : ""
          }`}
        >
          <div className="d-flex justify-content-between">
            <div className="d-flex flex-column justify-content-start">
              <span className="h6">{`#DAL${cardData.id}`}</span>
              <h5 className="card-title">{`${firstName} ${lastName}`}</h5>
              <div
                className={`${
                  cardData.status === "pending"
                    ? "text-danger"
                    : cardData.status === "confirmed"
                    ? "text-success"
                    : "text-secondary"
                } mt-3  d-flex `}
              >
                <div
                  className={`${
                    cardData.status === "pending"
                      ? "bg-danger"
                      : cardData.status === "confirmed"
                      ? "bg-success"
                      : "bg-secondary"
                  } dot`}
                ></div>{" "}
                <p className="h6">&nbsp;&nbsp;{cardData.status}</p>
              </div>
            </div>
            <div className="d-flex  justify-content-end flex-wrap align-content-center">
              <div
                className={`d-flex flex-column ${
                  cardData.status === "cancelled"
                    ? "text-secondary"
                    : "text-primary"
                }`}
              >
                <div className="p-1 ">{date}</div>
                <div className="p-1">{time}</div>
                {cardData.status === "pending" && user.user.is_staff && (
                  <div className="d-flex justify-content-center flex-wrap">
                    <div className="px-2">
                      <button
                        className="btn btn-primary"
                        onClick={() => onclick(cardData, "confirm")}
                        style={{ width: "100px" }}
                        data-bs-toggle="modal"
                        data-bs-target="#exampleModal5"
                      >
                        Confirm
                      </button>
                    </div>
                    <div>
                      {" "}
                      <button
                        className="btn btn-primary"
                        onClick={() => onclick(cardData, "reject")}
                        style={{ width: "100px" }}
                        data-bs-toggle="modal"
                        data-bs-target="#exampleModal5"
                      >
                        Reject
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default AppointmentCard;
