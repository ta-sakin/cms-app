import React from "react";

const Summary = ({ count }) => {
  return (
    <div className="mt-10 mb-16 max-w-3xl mx-auto">
      <div className="grid grid-cols-1 sm:grid-cols-3 place-items-center gap-8">
        <div className="bg-gray-100 w-44 py-10 text-center">
          <p>{count?.users}</p>
          <p>Total Users</p>
        </div>
        <div className="bg-gray-100 w-44 py-10 text-center">
          <p>{count?.complains}</p>
          <p>Total Complains</p>
        </div>
        <div className="bg-gray-100 w-44 py-10 text-center">
          <p>{count?.solved}</p>
          <p>Total Solved</p>
        </div>
      </div>
    </div>
  );
};

export default Summary;
