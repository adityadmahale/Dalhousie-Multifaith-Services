import { useState } from "react";
import { Link } from "react-router-dom";
import Input from "./inputField";
import Joi from "joi";
import Logo from "./logo";
import auth from "../services/authService";
import { toast } from "react-toastify";

const LoginChaplain = () => {
  const [chaplain, setChaplain] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});

  const handleChange = ({ currentTarget: input }) => {
    const account = { ...chaplain };
    account[input.name] = input.value;
    setChaplain(account);
  };

  const schema = Joi.object({
    email: Joi.string()
      .email({ tlds: { allow: false } })
      .required()
      .label("Email"),
    password: Joi.string().min(8).required().label("Password"),
  });

  const validate = () => {
    const result = schema.validate(chaplain, { abortEarly: false });

    if (!result.error) {
      return null;
    }
    const errors = {};
    for (let item of result.error.details) {
      errors[item.path[0]] = item.message;
    }

    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const errors = validate();
    setErrors(errors || {});
    if (errors) {
      return;
    }
    try {
      await auth.login(chaplain.email, chaplain.password);
      window.location = "/";
    } catch (ex) {
      if (
        ex.response &&
        ex.response.status >= 400 &&
        ex.response.status < 500
      ) {
        toast.error(ex.response.data.detail);
      }
    }
  };

  return (
    <form className="form-layout text-center" onSubmit={handleSubmit}>
      <Logo />

      <Input
        type="text"
        placeholder="Email"
        name="email"
        onChange={handleChange}
        value={chaplain.email}
        error={errors.email}
      />

      <Input
        type="password"
        placeholder="Password"
        name="password"
        onChange={handleChange}
        value={chaplain.password}
        error={errors.password}
      />

      <Link
        to="/recovery/email"
        state={{ user: "chaplain" }}
        className="link float-end"
      >
        Forgot Password?
      </Link>
      <button className="btn btn-primary">Sign In</button>
      <div className="text-center">
        <span>New to DMS? </span>
        <Link to="/register/chaplain" className="link">
          Register
        </Link>
      </div>
    </form>
  );
};

export default LoginChaplain;
