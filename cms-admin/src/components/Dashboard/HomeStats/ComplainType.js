import React from "react";

const ComplainType = ({ count }) => {
  return (
    <div className="mt-10 mb-16 max-w-3xl mx-auto">
      <p className="bg-gray-100 flex justify-center rounded-lg font-semibold text-gray-500 my-3 py-1">
        Complains By Type
      </p>
      <div className="grid grid-cols-2 sm:grid-cols-4 place-items-center gap-8">
        <div className="bg-gray-100 w-44 py-10 text-center rounded-xl">
          <p>{count?.public}</p>
          <p>Public</p>
        </div>
        <div className="bg-gray-100 w-44 py-10 text-center rounded-xl">
          <p>{count?.private}</p>
          <p>Private</p>
        </div>
      </div>
    </div>
  );
};

export default ComplainType;
