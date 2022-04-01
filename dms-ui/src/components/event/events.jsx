import { useState, useContext } from "react";
import EventsCard from "./eventsCard";
import Input from "../common/inputField";
import Modal from "../common/modal";
import Logo from "../common/logo";
import EventContext from "../../context/eventContext";

const Events = () => {
  const eventContext = useContext(EventContext);
  const [event, setEvent] = useState({
    eventName: "",
    address: "",
    time: "",
    date: "",
    hostname: "",
    hostDesignation: "",
    seats: "",
    eventDetails: "",
  });
  const handleChange = ({ currentTarget: input }) => {
    const account = { ...event };
    account[input.name] = input.value;
    setEvent(account);
  };
  return (
    <>
      <button
        className="btn btn-primary btn-detail"
        style={{ maxWidth: "300px" }}
        data-bs-toggle="modal"
        data-bs-target="#exampleModal4"
      >
        Add Event
      </button>
      <div>
        <Modal id="exampleModal4">
          <form
            className=""
            id="event"
            onSubmit={(e) => eventContext.handleAddEvent(e, event)}
          >
            <div className="text-center">
              <Logo />
            </div>
            <div className="">
              <span className="font-weight-bold">Name:</span>
              <Input
                type="text"
                placeholder="Enter Event Name"
                name="eventName"
                onChange={handleChange}
                value={event.eventName}
              />
            </div>
            <div className="">
              <span className="font-weight-bold">Address:</span>
              <Input
                type="text"
                placeholder="Enter Event Address"
                name="address"
                onChange={handleChange}
                value={event.address}
              />
            </div>
            <div className="">
              <span className="font-weight-bold">Date:</span>
              <Input
                type="date"
                placeholder="Enter Event Date"
                name="date"
                onChange={handleChange}
                value={event.date}
              />
            </div>
            <div className="">
              <span className="font-weight-bold">Time:</span>
              <Input
                type="time"
                placeholder="Enter Event Time"
                name="time"
                onChange={handleChange}
                value={event.time}
              />
            </div>
            <div className="">
              <span className="font-weight-bold">Host Name:</span>
              <Input
                type="text"
                placeholder="Enter Event Host name"
                name="hostname"
                onChange={handleChange}
                value={event.hostname}
              />
            </div>
            <div className="">
              <span className="font-weight-bold">Host Designation:</span>
              <Input
                type="text"
                placeholder="Enter Event Host Designation"
                name="hostDesignation"
                onChange={handleChange}
                value={event.hostDesignation}
              />
            </div>
            <div className="">
              <span className="font-weight-bold">Event Seats:</span>
              <Input
                type="text"
                placeholder="Enter Event Seats"
                name="seats"
                onChange={handleChange}
                value={event.seats}
              />
            </div>
            <div className="">
              <span className="font-weight-bold">Event Details:</span>
              <Input
                type="text"
                placeholder="Enter Event Details"
                name="eventDetails"
                onChange={handleChange}
                value={event.eventDetails}
              />
            </div>
            <button
              className="btn btn-primary"
              type="submit"
              data-bs-dismiss="modal"
            >
              Confirm
            </button>
          </form>
        </Modal>
      </div>
      <div key="index" className="mb-4">
        <div className="p-2 mb-2">
          <h4 style={{ color: "#727272" }}>Upcoming Events</h4>
        </div>

        <div className="d-flex flex-wrap">
          {eventContext.events.map((eventData) => (
            <EventsCard key={eventData.id} data={eventData} />
          ))}
        </div>
      </div>
    </>
  );
};

export default Events;
