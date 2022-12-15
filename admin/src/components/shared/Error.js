import React from "react";
import { AiOutlineExclamationCircle } from "react-icons/ai";

const Error = ({ error }) => {
  let err = error.includes("auth/")
    ? error.split("/")[1].split("-").join(" ")
    : error;
  if (err.includes(")")) {
    err = err.split(")");
    err = err[0];
  }

  return (
    <div className="bg-red-500 mt-4">
      <p className="text-white flex justify-center items-center py-2 capitalize">
        <AiOutlineExclamationCircle className="mr-1" />
        {err}
      </p>
    </div>
  );
};

export default Error;
