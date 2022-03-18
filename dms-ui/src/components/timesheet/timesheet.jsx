import React, { Fragment, useMemo, useState } from 'react'
import PropTypes from 'prop-types'
import { Calendar, Views, DateLocalizer, momentLocalizer,  } from 'react-big-calendar'
import moment from 'moment'
import Input from "../common/inputField";
import Modal from "../common/modal";

const localizer = momentLocalizer(moment) // or globalizeLocalizer

export default function Resource() {
  const [event, setEvent] = useState({ title: "", start_date: "" , end_date: "" , start_time: "" , end_date: "" });
  const handleChange = ({ currentTarget: input }) => {
    const account = { ...event};
    account[input.name] = input.value;
    setEvent(account);

  };
  const [display,setDisplay] = useState(false);
  const events = [
    {
      id: 0,
      title: 'Attended Student: B0089706',
      start: new Date(2022, 2, 29, 9, 0, 0),
      end: new Date(2022, 2, 29, 13, 0, 0),
      resourceId: 1,
    },
    {
      title: 'Attended Student: B0089706',
      allDay: true,
      start: new Date(2022, 2, 19, 14, 0, 0),
      end: new Date(2022, 2,19, 16, 20, 0),
      
    },
    {
      title: 'Attended Student: B0089706',
      start: new Date(2022, 2, 15, 8, 20, 0),
      end: new Date(2022, 2, 15, 12, 20, 0),
      
    },
    {
      title: 'Attended Student: B0089706',
      start: new Date(2022, 2, 14, 7, 0, 0),
      end: new Date(2022, 2, 14, 10, 30, 0),
      
    },
  ]
  
  const ColoredDateCellWrapper = ({ children }) =>
  React.cloneElement(React.Children.only(children), {
    style: {
      backgroundColor: 'lightblue',
    },
  })

  const { components, defaultDate, max, views } = useMemo(
    () => ({
      components: {
        timeSlotWrapper: ColoredDateCellWrapper,
      },
      defaultDate: new Date(),
      views: Object.keys(Views).map((k) => Views[k]),
    }),
    []
  )
  const onclick = () => {
    setDisplay(true);
  }
  const handleSubmit = (e) => {
    e.preventDefault(); 
    let data = {
      title: event.title,
      start:  new Date(event.start_date + 'T' + event.start_time),
      end: new Date(event.end_date + 'T' + event.end_time),
    }
    setDisplay(false);
  }
  let classes = "btn btn-primary btn-detail";
  return (
    
    <Fragment>
     <button onClick={onclick}
      className={classes}
      style={{ maxWidth: "300px" }}
      data-bs-toggle="modal"
      data-bs-target="#exampleModal2"
    >
      Add Event
    </button >
    {display &&
    <div >
      <Modal id="exampleModal2">
      <form  id="event" onSubmit={handleSubmit}>
        <div className=''>
          <span className='font-weight-bold'>Event Name:</span>
      <Input
        type="text"
        placeholder="Enter Event Name"
        name="title"
        onChange={handleChange}
        value={event.title}
       
      />
      </div>
      <div>
        <span className='font-weight-bold'>Start Date:</span>
      <Input
        type="date"
        placeholder="Start date"
        name="start_date"
        onChange={handleChange}
        value={event.start_date}
      
      />
      </div>
      <div>
        <span className='font-weight-bold'>End Date:</span>
      <Input
        type="date"
        placeholder="End date"
        name="end_date"
        onChange={handleChange}
        value={event.end_date}
      
      />
      </div>
      <div>
        <span className='font-weight-bold'>Start Time:</span>
      <Input
        type="time"
        placeholder="Start time"
        name="start_time"
        onChange={handleChange}
        value={event.start_time}
    
      />
      </div>
      <div>
        <span className='font-weight-bold'>End Time:</span>
      <Input
        type="time"
        placeholder="End time"
        name="end_time"
        onChange={handleChange}
        value={event.end_time}
      
      />
      </div>
      <button className="btn btn-primary" type='submit' data-bs-dismiss="modal" >Confirm</button>
    </form>
    
      </Modal>
      </div>
    }
      <div className="height600 bg-white">
        <Calendar
          defaultDate={defaultDate}
          defaultView={Views.MONTH}
          events={events}
          localizer={localizer}
          step={60}
          views={views}
          startAccessor="start"
          endAccessor="end"
          min={moment('12:00am', 'h:mma').toDate()}
          max={moment('11:59pm', 'h:mma').toDate()}
          draggableAccessor={(event) => true}
        />
      </div>
    </Fragment>
  )
}
Resource.propTypes = {
  localizer: PropTypes.instanceOf(DateLocalizer),
}