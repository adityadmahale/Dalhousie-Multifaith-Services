import { useEffect, useState } from "react";
import Joi from "joi";
import Input from "./inputField";
import Logo from "./logo";
import { useLocation, useNavigate } from "react-router-dom";

const RecoveryCode = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!location.state) {
      navigate("/");
    }
  });

  const [code, setCode] = useState({ code: "" });
  const [errors, setErrors] = useState({});

  const handleChange = ({ currentTarget: input }) => {
    const account = { ...code };
    account[input.name] = input.value;
    setCode(account);
  };

  const schema = Joi.object({
    code: Joi.string().required().min(6).max(6).label("Code"),
  });

  const validate = () => {
    const result = schema.validate(code, { abortEarly: false });

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
    navigate("/recovery/password", {
      state: { code: code.code, email: location.state },
    });
  };

  return (
    <form className="form-layout text-center" onSubmit={handleSubmit}>
      <Logo />
      <Input
        type="text"
        placeholder="Code"
        name="code"
        onChange={handleChange}
        value={code.code}
        error={errors.code}
      />
      <button className="btn btn-primary">Next</button>
    </form>
  );
};

export default RecoveryCode;
