import { useState, useEffect } from "react";
import Input from "../inputField";
import Joi from "joi";
import Logo from "../logo";
import { useNavigate, useLocation } from "react-router-dom";
import emailjs from "emailjs-com";
import { useRef } from "react";
const RecoveryEmail = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({ email: "" });
  const [errors, setErrors] = useState({});
  const form = useRef();
  const location = useLocation();

  useEffect(() => {
    if (!location.state) {
      navigate("/");
    }
  });

  const handleChange = ({ currentTarget: input }) => {
    const account = { ...user };
    account[input.name] = input.value;
    setUser(account);
  };

  const schema = Joi.object({
    email: Joi.string()
      .email({ tlds: { allow: false } })
      .required()
      .label("Email"),
  });

  const validate = () => {
    const result = schema.validate(user, { abortEarly: false });

    if (!result.error) {
      return null;
    }
    const errors = {};
    for (let item of result.error.details) {
      errors[item.path[0]] = item.message;
    }

    return errors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const errors = validate();
    setErrors(errors || {});
    if (errors) {
      return;
    }
    sendEmail(e);
    navigate("/recovery/code", {
      state: {
        email: e.target.email.value,
        code: e.target.message.value,
        user: location.state.user,
      },
    });
  };
  const sendEmail = (e) => {
    e.preventDefault();
    emailjs
      .sendForm(
        "service_sl0idrg",
        "template_x7egss2",
        form.current,
        "R5Pc47SwqiD03yrMb"
      )
      .then(
        (result) => {
          console.log(result.text);
        },
        (error) => {
          console.log(error.text);
        }
      );
  };
  return (
    <form
      ref={form}
      className="form-layout text-center"
      onSubmit={handleSubmit}
    >
      <Logo />

      <Input
        type="text"
        name="email"
        placeholder="Email"
        onChange={handleChange}
        value={user.email}
        error={errors.email}
      />
      <input
        name="message"
        hidden
        value={Math.floor(100000 + Math.random() * 100000)}
        readOnly
      />
      <button className="btn btn-primary">Send Recovery Code</button>
    </form>
  );
};

export default RecoveryEmail;
