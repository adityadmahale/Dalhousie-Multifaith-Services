import { useState } from "react";
import { Link } from "react-router-dom";
import PhoneInput from "react-phone-number-input";
import Input from "./inputField";
import Joi from "joi";
import Logo from "./logo";
import ListError from "./listError";

import { register, registerDalUser } from "../services/userService";
import auth from "../services/authService";
import { toast } from "react-toastify";

const RegisterUser = () => {
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [phoneNumber, setPhoneNumber] = useState(undefined);
  const [errors, setErrors] = useState({});

  const handleChange = ({ currentTarget: input }) => {
    const account = { ...user };
    account[input.name] = input.value;
    setUser(account);
  };

  const schema = Joi.object({
    firstName: Joi.string().required().label("First Name"),
    lastName: Joi.string().required().label("Last Name"),
    email: Joi.string()
      .email({ tlds: { allow: false } })
      .regex(RegExp(".*@dal.ca$"))
      .required()
      .label("Email")
      .messages({
        "string.pattern.base": '"Email" must belong to the university domain',
      }),
    password: Joi.string().min(8).required().label("Password"),
    confirmPassword: Joi.any()
      .equal(Joi.ref("password"))
      .required()
      .messages({ "any.only": "Password does not match" }),
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    const errors = validate();
    setErrors(errors || {});
    if (errors) {
      return;
    }

    try {
      const { data } = await register({
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        password: user.password,
        is_staff: false,
      });
      await registerDalUser({ user_id: data.id, phone: phoneNumber });
      await auth.login(user.email, user.password);
      window.location = "/";
    } catch (ex) {
      if (
        ex.response &&
        ex.response.status >= 400 &&
        ex.response.status < 500
      ) {
        toast.error(<ListError errors={Object.values(ex.response.data)} />, {
          icon: false,
        });
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
          placeholder="First Name"
          name="firstName"
          value={user.firstName}
          onChange={handleChange}
        />
        <input
          type="text"
          className="form-control"
          placeholder="Last Name"
          name="lastName"
          value={user.lastName}
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
        value={user.email}
        error={errors.email}
      />
      <Input
        type="password"
        placeholder="Password"
        name="password"
        onChange={handleChange}
        value={user.password}
        error={errors.password}
      />
      <Input
        type="password"
        placeholder="Confirm Password"
        name="confirmPassword"
        onChange={handleChange}
        value={user.confirmPassword}
        error={errors.confirmPassword}
      />
      <button className="btn btn-primary">Sign Up</button>
      <div className="text-center">
        <Link to="/login/user" className="link">
          Already have an account?
        </Link>
      </div>
    </form>
  );
};

export default RegisterUser;
