import React, { useState, useRef } from "react";
import { getSlotRange } from "../../utility/booking";
import emailjs from "emailjs-com";
import Input from "../common/inputField";
import CardConfirmation from "./cardConfirmation";

const CardDisplay = ({ slot, first_name, last_name, user, onClick }) => {
  const [display, setDisplay] = useState(false);
  const form = useRef();
  const sendEmail = (e) => {
    e.preventDefault();
    emailjs
      .sendForm(
        "service_sl0idrg",
        "template_jrwoe7o",
        form.current,
        "R5Pc47SwqiD03yrMb"
      )
      .then(
        (result) => {
          console.log(result.text);
          if (result.text === "OK") {
            setDisplay(true);
          }
        },
        (error) => {
          console.log(error.text);
        }
      );
  };

  if (slot === null) return null;

  const day = slot.getDate();
  const month = slot.getMonth() + 1;
  const year = slot.getFullYear();
  const slotTime =
    day + "/" + month + "/" + year + "-" + getSlotRange(slot.getHours());

  return (
    <>
      {display && <CardConfirmation />}
      {!display && (
        <div className="text-center card-confirmation">
          <i className="ri-mental-health-fill" style={{ color: "#4d97d4" }}></i>
          <p className="card-text">{`${first_name} ${last_name}`}</p>
          <p className="link">
            {`${day}/${month}/${year}`} - {getSlotRange(slot.getHours())}
          </p>
          <button
            className="btn btn-primary"
            onClick={(e) => {
              sendEmail(e);
              onClick();
            }}
            style={{ width: "300px" }}
          >
            Send Request
          </button>
          <form ref={form} className="d-none">
            <Input
              type="text"
              name="email"
              placeholder="Email"
              value={user.user.email}
            />
            <Input
              type="text"
              name="date"
              placeholder="date"
              value={slotTime}
            />
          </form>
        </div>
      )}
    </>
  );
};

export default CardDisplay;
