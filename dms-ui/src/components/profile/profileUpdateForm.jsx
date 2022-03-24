import React, { useState } from "react";
import PhoneInput from "react-phone-number-input";
import Input from "../common/inputField";
import Joi from "joi";

const ProfileUpdateForm = (props) => {
  const userFields = props.user.user.is_staff
    ? {
        religion: props.user.religion,
        description: props.user.description,
      }
    : {};
  const [user, setUser] = useState({
    firstName: props.user.user.first_name,
    lastName: props.user.user.last_name,
    password: "",
    confirmPassword: "",
    ...userFields,
  });
  const [phone, setPhone] = useState(props.user.phone);
  const [errors, setErrors] = useState({});

  const handleChange = ({ currentTarget: input }) => {
    const account = { ...user };
    account[input.name] = input.value;
    setUser(account);
  };

  const userSchema = props.user.user.is_staff
    ? {
        religion: Joi.string().required().label("Religion"),
        description: Joi.string().required().label("Description"),
      }
    : {};

  const schema = Joi.object({
    firstName: Joi.string().required().label("First Name"),
    lastName: Joi.string().required().label("Last Name"),
    password: Joi.string().min(8).required().label("Password"),
    confirmPassword: Joi.any()
      .equal(Joi.ref("password"))
      .required()
      .messages({ "any.only": "Password does not match" }),
    ...userSchema,
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
    console.log("Submitted");
  };

  return (
    <form className="text-center" onSubmit={handleSubmit}>
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
        value={phone}
        onChange={setPhone}
        placeholder="Phone Number"
        defaultCountry="CA"
      />
      {props.user.user.is_staff && (
        <React.Fragment>
          <Input
            type="text"
            placeholder="Religion"
            name="religion"
            onChange={handleChange}
            value={user.religion}
            error={errors.religion}
          />
          <Input
            type="text"
            placeholder="Description"
            name="description"
            onChange={handleChange}
            value={user.description}
            error={errors.description}
          />
        </React.Fragment>
      )}
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
      <button className="btn btn-primary">Update</button>
    </form>
  );
};

export default ProfileUpdateForm;
