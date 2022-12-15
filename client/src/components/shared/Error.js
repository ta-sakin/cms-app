import React from "react";
import { AiOutlineExclamationCircle } from "react-icons/ai";

const Error = ({ error }) => {
  return (
    <div className="bg-red-500 mt-4">
      <p className="text-white flex justify-center items-center py-2 capitalize">
        <AiOutlineExclamationCircle className="mr-1" />

        {error.includes("auth")
          ? error.split("/")[1].split("-").join(" ")
          : error}
      </p>
    </div>
  );
};

export default Error;
