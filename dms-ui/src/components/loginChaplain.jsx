import { useState } from "react";
import { Link } from "react-router-dom";
import Logo from "./logo";

const LoginChaplain = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <form className="form-layout text-center" onSubmit={handleSubmit}>
      <Logo />

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
      <Link to="/recovery" className="link float-end">
        Forgot Password?
      </Link>
      <button className="btn btn-primary">Sign In</button>
      <div className="text-center">
        <span>New to DMS? </span>
        <Link to="/register/chaplain" className="link">
          Register
        </Link>
      </div>
    </form>
  );
};

export default LoginChaplain;
