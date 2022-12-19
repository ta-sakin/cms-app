import React from "react";

const Summary = ({ count }) => {
  return (
    <div className="mt-10 mb-15 max-w-3xl mx-auto">
      <div className="grid grid-cols-2 sm:grid-cols-4 place-items-center gap-5">
        <div className="bg-gray-100 w-44 py-10 text-center rounded-lg border-2">
          <p>{count?.users}</p>
          <p>Total Users</p>
        </div>
        <div className="bg-gray-100 w-44 py-10 text-center rounded-lg border-2">
          <p>{count?.complains}</p>
          <p>Total Complaints</p>
        </div>
        <div className="bg-gray-100 w-44 py-10 text-center rounded-lg border-2">
          <p>{count?.solved}</p>
          <p>Total Solved</p>
        </div>
      </div>
    </div>
  );
};

export default Summary;
