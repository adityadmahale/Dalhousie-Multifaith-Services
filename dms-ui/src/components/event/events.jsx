import { useEffect, useState } from "react";
import { getEvents } from "../../services/events";
import EventsCard from "./eventsCard";
import Input from "../common/inputField"
import Modal from "../common/modal";
import Logo from "../common/logo"
import moment from "moment";
const Events = ({user}) => {
  let emptyData={  eventName: "",
  address: "",
  time: "",
  date: "",
  fees: "",
  contactNo: "",
  hostname: "",
  hostDesignation: "",
  seats: "",
  eventDetails: ""}
  const [events, setEvents] = useState([]);
  const [event, setEvent] = useState(emptyData);
  const [display,setDisplay] = useState(false);
  useEffect(() => {
    setEvents(getEvents());
  });
  const handleSubmit = (e) => {
    e.preventDefault(); 
    event.date=moment(event.date).format('MMM DD')
    // console.log(event)//contains added data

    events.push(event)
    setDisplay(false);
    setEvent(emptyData)
  }
  const handleChange = ({ currentTarget: input }) => {
    const account = { ...event}; 
    account[input.name] = input.value;
    setEvent(account);

  };
  const onclick = () => {
    setEvent(emptyData) 
    setDisplay(true);
  }
  return (
    <>
     { <button onClick={onclick}
      className="btn btn-primary btn-detail"
      style={{ maxWidth: "300px" }}
      data-bs-toggle="modal"
      data-bs-target="#exampleModal4"
    >
      Add Event
    </button >}
    {display &&
    <div >
      <Modal id="exampleModal4">
       
      <form className="" id="event" onSubmit={handleSubmit}>
      <div className="text-center"><Logo/></div>
        <div className=''>
          <span className='font-weight-bold'>Event Name:</span>
      <Input
        type="text"
        placeholder="Enter Event Name"
        name="eventName"
        onChange={handleChange}
        value={event.eventName}
       
      />
      </div>
      <div className=''>
          <span className='font-weight-bold'>Event Address:</span>
      <Input
        type="text"
        placeholder="Enter Event Address"
        name="address"
        onChange={handleChange}
        value={event.address}
       
      />
      </div>
      <div className=''>
          <span className='font-weight-bold'>Event Date:</span>
      <Input
        type="date"
        placeholder="Enter Event Date"
        name="date"
        onChange={handleChange}
        value={event.date}
       
      />
      </div>
      <div className=''>
          <span className='font-weight-bold'>Event Time:</span>
      <Input
        type="time"
        placeholder="Enter Event Time"
        name="time"
        onChange={handleChange}
        value={event.time}
       
      />
      </div>
      <div className=''>
          <span className='font-weight-bold'>Event Fees:</span>
      <Input
        type="text"
        placeholder="Enter Event Fee"
        name="fees"
        onChange={handleChange}
        value={event.fees}
       
      />
      </div>
      <div className=''>
          <span className='font-weight-bold'>Event Contact Number:</span>
      <Input
        type="text"
        placeholder="Enter Event Contact Number"
        name="contactNo"
        onChange={handleChange}
        value={event.contactNo}
       
      />
      </div>
      <div className=''>
          <span className='font-weight-bold'>Event Host Name:</span>
      <Input
        type="text"
        placeholder="Enter Event Host name"
        name="hostname"
        onChange={handleChange}
        value={event.hostname}
       
      />
      </div>
      <div className=''>
          <span className='font-weight-bold'>Event Host Designation:</span>
      <Input
        type="text"
        placeholder="Enter Event Host Designation"
        name="hostDesignation"
        onChange={handleChange}
        value={event.hostDesignation}
       
      />
      </div>
      <div className=''>
          <span className='font-weight-bold'>Event Seats:</span>
      <Input
        type="text"
        placeholder="Enter Event Seats"
        name="seats"
        onChange={handleChange}
        value={event.seats}
       
      />
      </div>
      <div className=''>
          <span className='font-weight-bold'>Event Details:</span>
      <Input
        type="text"
        placeholder="Enter Event Details"
        name="eventDetails"
        onChange={handleChange}
        value={event.eventDetails}
       
      />
      </div>
      <button className="btn btn-primary" type='submit' data-bs-dismiss="modal" >Confirm</button>
    </form>
    
      </Modal>
      </div>
    }
     
        <div key="index" className="mb-4">
          <div className="p-2 mb-2">
            <h4 style={{ color: "#727272" }}>Upcoming Events</h4>
          </div>

          <div className="d-flex flex-wrap">
            {events.map((data, index) => (
              <EventsCard key={index} data={data} />
            ))}
          </div>
        </div>
    
    </>
  );
};

export default Events;
