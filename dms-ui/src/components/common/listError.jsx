import React from "react";

const ListError = ({ errors }) => {
  return (
    <div>
      {errors.map((error) => (
        <p key={error}>{error}</p>
      ))}
    </div>
  );
};

export default ListError;
