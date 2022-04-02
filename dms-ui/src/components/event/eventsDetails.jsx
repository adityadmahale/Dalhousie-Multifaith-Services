import React, { useEffect, useState, useContext } from "react";
import { useLocation } from "react-router-dom";
import EventContext from "../../context/eventContext";

const EventsDetails = () => {
  const eventContext = useContext(EventContext);
  const [event, setEvent] = useState({});
  const location = useLocation();
  const day = new Date(event.event_date);
  useEffect(() => {
    setEvent(location.state.event);
  }, [location]);
  return (
    <>
      <div className="d-flex flex-column">
        <div
          className="events-card "
          style={{
            padding: "0px",
            maxHeight: "50vh",
            overflow: "hidden",
            borderRadius: "25px 25px 0px 0px",
            minHeight: "380px",
          }}
        >
          <img
            className="card-img"
            src={process.env.PUBLIC_URL + "/events/events.svg"}
            alt=""
          />
          <div
            className="card-img-overlay  "
            style={{
              background: "rgb(0, 0, 0,0.5)",
              borderRadius: "0",
            }}
          >
            <div className="d-flex flex-column ">
              <div className={`row text-white`}>
                <div className="d-flex justify-content-between p-4">
                  <div className="d-flex flex-column justify-content-start align-content-">
                    <div>
                      <h4 className="card-title" style={{ fontSize: "32px" }}>
                        {event.event_title}
                      </h4>
                      <div
                        className=" d-flex align-items-center card-subtitle mb-4  "
                        style={{ fontSize: "18px" }}
                      >
                        {`${day.getDate()} ${day.toLocaleString("default", {
                          month: "long",
                        })}, ${day.getFullYear()}`}
                        <div className="p-2">
                          <svg
                            width="18"
                            height="22"
                            viewBox="0 0 18 22"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M15.364 15.364L9 21.728L2.636 15.364C1.37734 14.1053 0.520187 12.5017 0.172928 10.7558C-0.17433 9.01002 0.00390685 7.20043 0.685099 5.5559C1.36629 3.91137 2.51984 2.50577 3.99988 1.51684C5.47992 0.527914 7.21998 7.62939e-05 9 7.62939e-05C10.78 7.62939e-05 12.5201 0.527914 14.0001 1.51684C15.4802 2.50577 16.6337 3.91137 17.3149 5.5559C17.9961 7.20043 18.1743 9.01002 17.8271 10.7558C17.4798 12.5017 16.6227 14.1053 15.364 15.364ZM9 11C9.53044 11 10.0391 10.7893 10.4142 10.4142C10.7893 10.0391 11 9.53043 11 9C11 8.46957 10.7893 7.96086 10.4142 7.58578C10.0391 7.21071 9.53044 7 9 7C8.46957 7 7.96086 7.21071 7.58579 7.58578C7.21072 7.96086 7 8.46957 7 9C7 9.53043 7.21072 10.0391 7.58579 10.4142C7.96086 10.7893 8.46957 11 9 11Z"
                              fill="#F3BE36"
                            />
                          </svg>
                        </div>
                        {event.event_location}
                      </div>
                    </div>
                  </div>
                  <div className="d-flex justify-content-between justify-content-end ">
                    <div className={`d-flex flex-column `}>
                      <div className="p-1 " style={{ fontSize: "24px" }}>
                        Available Seats
                      </div>
                      <div
                        className="p-1 d-flex justify-content-end"
                        style={{ fontSize: "48px" }}
                      >
                        {event.available_seats}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="d-flex justify-content-between p-4">
                  <div className="d-flex flex-column justify-content-start ">
                    <div className="d-flex flex-wrap   ">
                      <div className="d-flex align-self-center ">
                        <img
                          className="profile-img"
                          style={{ height: "50px", width: "50px" }}
                          src={process.env.PUBLIC_URL + "/andrew.png"}
                          alt="profile"
                        />{" "}
                      </div>
                      <div className="card-body">
                        {event.host_name}
                        <br />
                        {event.host_details}
                      </div>
                    </div>
                  </div>
                  <div className="d-flex justify-content-between justify-content-end ">
                    <div className={`d-flex flex-column `}>
                      <button
                        className="btn btn-primary px-5"
                        onClick={() => eventContext.handleBooking(event)}
                      >
                        Book
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          className="events-card "
          style={{ border: 0, borderRadius: "0px 0px 25px 25px" }}
        >
          <div className="card-body">
            <h4 className="card-title">Description</h4>
            <p className="card-text">{event.event_description}</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default EventsDetails;
