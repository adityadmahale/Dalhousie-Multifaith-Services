import { useEffect, useState } from "react";
import Input from "../common/inputField";
import Joi from "joi";
import Logo from "../common/logo";
import { updatePassword } from "../../services/userService";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const RecoveryPassword = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!location.state) {
      navigate("/");
    }
  });

  const [user, setUser] = useState({
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});

  const handleChange = ({ currentTarget: input }) => {
    const account = { ...user };
    account[input.name] = input.value;
    setUser(account);
  };

  const schema = Joi.object({
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
      await updatePassword(location.state.email, user.password);
      toast.success("Password updated successfully.");
      navigate(`/login/${location.state.user}`);
    } catch (ex) {
      toast.error(
        "user with this email address does not exist in the database."
      );
    }
  };

  return (
    <form className="form-layout text-center" onSubmit={handleSubmit}>
      <Logo />

      <Input
        type="password"
        placeholder="New Password"
        name="password"
        onChange={handleChange}
        value={user.password}
        error={errors.password}
      />
      <Input
        type="password"
        placeholder="Confirm New Password"
        name="confirmPassword"
        onChange={handleChange}
        value={user.confirmPassword}
        error={errors.confirmPassword}
      />
      <button className="btn btn-primary">Set Password</button>
    </form>
  );
};

export default RecoveryPassword;
