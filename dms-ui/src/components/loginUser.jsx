import { useState } from "react";
import { Link } from "react-router-dom";
import Input from "./inputField";
import Joi from "joi";
import Logo from "./logo";

const LoginUser = () => {
  const [user, setUser] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});

  const handleChange = ({ currentTarget: input }) => {
    const account = { ...user };
    account[input.name] = input.value;
    setUser(account);
  };

  const schema = Joi.object({
    email: Joi.string()
      .email({ tlds: { allow: false } })
      .regex(RegExp(".*@dal.ca$"))
      .required()
      .label("Email")
      .messages({
        "string.pattern.base": '"Email" must belong to the university domain',
      }),
    password: Joi.string().min(8).required().label("Password"),
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
    <form className="form-layout text-center" onSubmit={handleSubmit}>
      <Logo />

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

      <Link to="/recovery" className="link float-end">
        Forgot Password?
      </Link>
      <button className="btn btn-primary">Sign In</button>
      <div className="text-center">
        <span>New to DMS? </span>
        <Link to="/register/user" className="link">
          Register
        </Link>
      </div>
    </form>
  );
};

export default LoginUser;
