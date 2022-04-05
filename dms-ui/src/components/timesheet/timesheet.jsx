import React, {
  Fragment,
  useMemo,
  useState,
  useContext,
  useEffect,
} from "react";
import PropTypes from "prop-types";
import {
  Calendar,
  Views,
  DateLocalizer,
  momentLocalizer,
} from "react-big-calendar";
import moment from "moment";
import Input from "../common/inputField";
import Modal from "../common/modal";
import TimesheetContext from "../../context/timesheetContext";

const localizer = momentLocalizer(moment); // or globalizeLocalizer

export default function TimeSheet({ user }) {
  const [event, setEvent] = useState({
    title: "",
    start_date: "",
    end_date: "",
    start_time: "",
    end_time: "",
  });
  const timesheetContext = useContext(TimesheetContext);
  const handleChange = ({ currentTarget: input }) => {
    const account = { ...event };
    account[input.name] = input.value;
    setEvent(account);
  };

  useEffect(() => {
    timesheetContext.timesheet.map((item) => {
      item["start"] = new Date(item["start"]);
      item["end"] = new Date(item["end"]);
    });
  }, []);

  const ColoredDateCellWrapper = ({ children }) =>
    React.cloneElement(React.Children.only(children), {
      style: {
        backgroundColor: "lightblue",
      },
    });

  const { defaultDate, views } = useMemo(
    () => ({
      components: {
        timeSlotWrapper: ColoredDateCellWrapper,
      },
      defaultDate: new Date(),
      views: Object.keys(Views).map((k) => Views[k]),
    }),
    []
  );

  let classes = "btn btn-primary btn-detail";
  return (
    <Fragment>
      <button
        className={classes}
        style={{ maxWidth: "300px" }}
        data-bs-toggle="modal"
        data-bs-target="#exampleModal2"
      >
        Add
      </button>

      <div>
        <Modal id="exampleModal2">
          <form
            id="event"
            onSubmit={(e) => {
              e.preventDefault();
              timesheetContext.handleTimesheetSubmit({
                chaplain_id: user.id,
                title: event.title,
                start: String(
                  new Date(event.start_date + "T" + event.start_time)
                ),
                end: String(new Date(event.end_date + "T" + event.end_time)),
              });
            }}
          >
            <div className="">
              <span className="font-weight-bold">Title:</span>
              <Input
                type="text"
                placeholder="Enter Title"
                name="title"
                onChange={handleChange}
                value={event.title}
              />
            </div>
            <div>
              <span className="font-weight-bold">Start Date:</span>
              <Input
                type="date"
                placeholder="Start date"
                name="start_date"
                onChange={handleChange}
                value={event.start_date}
              />
            </div>
            <div>
              <span className="font-weight-bold">End Date:</span>
              <Input
                type="date"
                placeholder="End date"
                name="end_date"
                onChange={handleChange}
                value={event.end_date}
              />
            </div>
            <div>
              <span className="font-weight-bold">Start Time:</span>
              <Input
                type="time"
                placeholder="Start time"
                name="start_time"
                onChange={handleChange}
                value={event.start_time}
              />
            </div>
            <div>
              <span className="font-weight-bold">End Time:</span>
              <Input
                type="time"
                placeholder="End time"
                name="end_time"
                onChange={handleChange}
                value={event.end_time}
              />
            </div>
            <button
              className="btn btn-primary"
              data-bs-dismiss="modal"
              type="submit"
            >
              Confirm
            </button>
          </form>
        </Modal>
      </div>

      <div className="height600 bg-white">
        <Calendar
          defaultDate={defaultDate}
          defaultView={Views.MONTH}
          events={timesheetContext.timesheet}
          localizer={localizer}
          step={60}
          views={views}
          startAccessor="start"
          endAccessor="end"
          min={moment("12:00am", "h:mma").toDate()}
          max={moment("11:59pm", "h:mma").toDate()}
          draggableAccessor={(e) => true}
        />
      </div>
    </Fragment>
  );
}
TimeSheet.propTypes = {
  localizer: PropTypes.instanceOf(DateLocalizer),
};
