import React from "react";

const ServerError = ({ error }) => {
  return (
    <div className="h-screen w-screen flex justify-center items-center">
      <p className="text-red-400 text-center">{error}</p>
    </div>
  );
};

export default ServerError;
