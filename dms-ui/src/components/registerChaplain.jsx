import { useState } from "react";
import { Link } from "react-router-dom";
import PhoneInput from "react-phone-number-input";
import Input from "./inputField";
import Joi from "joi";
import Logo from "./logo";
import { registerChaplain, register } from "../services/userService";
import auth from "../services/authService";

const RegisterChaplain = () => {
  const [chaplain, setChaplain] = useState({
    firstName: "",
    lastName: "",
    email: "",
    religion: "",
    password: "",
    confirmPassword: "",
  });
  const [phoneNumber, setPhoneNumber] = useState(undefined);
  const [description, setDescription] = useState("");
  const [errors, setErrors] = useState({});

  const handleChange = ({ currentTarget: input }) => {
    const account = { ...chaplain };
    account[input.name] = input.value;
    setChaplain(account);
  };

  const schema = Joi.object({
    firstName: Joi.string().required().label("First Name"),
    lastName: Joi.string().required().label("Last Name"),
    email: Joi.string()
      .email({ tlds: { allow: false } })
      .required()
      .label("Email"),
    religion: Joi.string().required().label("Religion"),
    password: Joi.string().min(8).required().label("Password"),
    confirmPassword: Joi.any()
      .equal(Joi.ref("password"))
      .required()
      .messages({ "any.only": "Password does not match" }),
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
      const { data } = await register({
        firstName: chaplain.firstName,
        lastName: chaplain.lastName,
        email: chaplain.email,
        password: chaplain.password,
      });
      await registerChaplain({
        user_id: data.id,
        phone: phoneNumber,
        religion: chaplain.religion,
        description: description,
      });
      await auth.login(chaplain.email, chaplain.password);
      window.location = "/";
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        const serverErrors = { errors };
        serverErrors.email = ex.response.data;
        setErrors(serverErrors);
      }
    }
  };

  return (
    <form className="form-layout text-center" onSubmit={handleSubmit}>
      <Logo />
      <div className="input-group">
        <input
          type="text"
          className="form-control"
          name="firstName"
          placeholder="First Name"
          value={chaplain.firstName}
          onChange={handleChange}
        />
        <input
          type="text"
          className="form-control"
          name="lastName"
          placeholder="Last Name"
          value={chaplain.lastName}
          onChange={handleChange}
        />
      </div>
      {errors.firstName && (
        <div className="alert alert-danger p-1 m-0">{errors.firstName}</div>
      )}
      {errors.lastName && (
        <div className="alert alert-danger p-1 m-0">{errors.lastName}</div>
      )}
      <div className="mb-3"></div>
      <Input
        type="text"
        placeholder="Religion"
        name="religion"
        onChange={handleChange}
        value={chaplain.religion}
        error={errors.religion}
      />
      <textarea
        className="form-control mb-3"
        placeholder="Description"
        id="Description1"
        value={description}
        rows="3"
        onChange={(e) => setDescription(e.currentTarget.value)}
      ></textarea>
      <PhoneInput
        className="form-control mb-3"
        value={phoneNumber}
        onChange={setPhoneNumber}
        placeholder="Phone Number"
        defaultCountry="CA"
      />
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
      <Input
        type="password"
        placeholder="Confirm Password"
        name="confirmPassword"
        onChange={handleChange}
        value={chaplain.confirmPassword}
        error={errors.confirmPassword}
      />
      <button className="btn btn-primary">Sign Up</button>
      <div className="text-center">
        <Link to="/login/chaplain" className="link">
          Already have an account?
        </Link>
      </div>
    </form>
  );
};

export default RegisterChaplain;
