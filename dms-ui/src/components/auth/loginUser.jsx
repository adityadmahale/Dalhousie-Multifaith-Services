import Joi from "joi";
import { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import Input from "../common/inputField";
import Logo from "../common/logo";
import auth from "../../services/authService";

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
      .regex(/.*@dal.ca$/)
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
    const allErrors = {};
    for (let item of result.error.details) {
      allErrors[item.path[0]] = item.message;
    }

    return allErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const allErrors = validate();
    setErrors(allErrors || {});
    if (allErrors) {
      return;
    }

    try {
      await auth.login(user.email, user.password);
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

      <Link
        to="/recovery/email"
        state={{ user: "user" }}
        className="link float-end"
      >
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
