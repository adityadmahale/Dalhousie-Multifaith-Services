import { useState } from "react";
import { Link } from "react-router-dom";
import PhoneInput from "react-phone-number-input";
import Logo from "./logo";

const RegisterChaplain = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState(undefined);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <form className="form-layout text-center" onSubmit={handleSubmit}>
      <Logo />
      <div className="input-group">
        <input
          type="text"
          className="form-control"
          placeholder="First Name"
          value={firstName}
          onChange={(e) => setFirstName(e.currentTarget.value)}
        />
        <input
          type="text"
          className="form-control"
          placeholder="Last Name"
          value={lastName}
          onChange={(e) => setLastName(e.currentTarget.value)}
        />
      </div>
      <PhoneInput
        className="form-control"
        value={phoneNumber}
        onChange={setPhoneNumber}
        placeholder="Phone Number"
        defaultCountry="CA"
      />
      <input
        type="text"
        className="form-control"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.currentTarget.value)}
      />
      <input
        type="password"
        className="form-control"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.currentTarget.value)}
      />
      <input
        type="password"
        className="form-control"
        placeholder="Confirm Password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.currentTarget.value)}
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
