import { useState } from "react";
import Joi from "joi";
import Input from "./inputField";
import Logo from "./logo";

const RecoveryCode = () => {
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
    console.log("Submitted");
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
