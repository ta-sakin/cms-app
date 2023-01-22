import React from "react";

const ComplainType = ({ count }) => {
  return (
    <div className="mt-10 mb-10 max-w-3xl mx-auto">
      <p className="bg-gray-100 border-2 flex justify-center rounded-lg font-semibold text-gray-500 my-5 py-1">
        Complaints By Type
      </p>
      <div className="grid grid-cols-2 sm:grid-cols-4 place-items-center gap-5">
        <div className="bg-gray-100 w-44 py-10 text-center rounded-xl border-2">
          <p>{count?.type.public}</p>
          <p>Public</p>
        </div>
        <div className="bg-gray-100 w-44 py-10 text-center rounded-xl border-2">
          <p>{count?.type.private ? count?.type.private : 0}</p>
          <p>Private</p>
        </div>
      </div>
    </div>
  );
};

export default ComplainType;
