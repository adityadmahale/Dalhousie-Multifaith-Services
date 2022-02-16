import { useState } from "react";
import Input from "./inputField";
import Joi from "joi";
import Logo from "./logo";
import { useNavigate } from "react-router-dom";

const RecoveryEmail = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({ email: "" });
  const [errors, setErrors] = useState({});

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
    navigate("/recovery/code", { state: user.email });
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
      <button className="btn btn-primary">Send Recovery Code</button>
    </form>
  );
};

export default RecoveryEmail;
