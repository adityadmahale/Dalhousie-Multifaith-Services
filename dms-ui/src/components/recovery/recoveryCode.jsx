import { useEffect, useState } from "react";
import Joi from "joi";
import Input from "../common/inputField";
import Logo from "../common/logo";
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
    code: Joi.string().required().equal(location.state.code),
  });

  const validate = () => {
    const result = schema.validate(code, { abortEaxrly: false });
    if (!result.error) {
      return null;
    }
    const allErrors = {};
    for (let item of result.error.details) {
      allErrors[item.path[0]] = item.message;
    }

    return allErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    let allErrors = validate();
    if (allErrors) {
      if (allErrors.code.split(" ")[0] === '"code"') {
        allErrors = { code: "Please enter correct code." };
      }
    }
    setErrors(allErrors || {});
    if (allErrors) {
      return;
    }
    navigate("/recovery/password", {
      state: {
        code: code.code,
        email: location.state.email,
        user: location.state.user,
      },
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
