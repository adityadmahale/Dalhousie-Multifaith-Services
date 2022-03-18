import React from "react";

const Input = ({ type, placeholder, name, onChange, error, value }) => {
  return (
    <div className="form-group">
      <input
        type={type}
        className="form-control"
        placeholder={placeholder}
        name={name}
        value={value}
        onChange={onChange}
      />
      {error && <div className="alert alert-danger p-1">{error}</div>}
    </div>
  );
};

export default Input;
