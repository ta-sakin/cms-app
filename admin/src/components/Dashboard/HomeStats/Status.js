import React from "react";

const Status = ({ count }) => {
  const statusList = [
    "Pending approval",
    "In verification",
    "In hold",
    "In progress",
    "Rejected",
    "Closed",
  ];
  console.log("status", count);
  return (
    <div className="mt-10 mb-16 max-w-3xl mx-auto">
      <p className="bg-gray-100 flex justify-center rounded-lg font-semibold text-gray-500 my-3 py-1">
        Complains By Status
      </p>
      <div className="grid grid-cols-2 sm:grid-cols-4 place-items-center gap-8">
        <div className="bg-gray-100 w-44 py-10 text-center rounded-xl">
          <p>{count?.complains}</p>
          <p>ALL Complains</p>
        </div>
        {statusList.map((status, i) => (
          <div
            key={i}
            className="bg-gray-100 w-44 py-10 text-center rounded-xl"
          >
            <p>
              {count?.status[status.toLowerCase()]
                ? count?.status[status.toLowerCase()]
                : 0}
            </p>
            <p className="capitalized">{status}</p>
          </div>
        ))}

        {/* <div className="bg-gray-100 w-44 py-10 text-center rounded-xl">
          <p>0</p>
          <p>Approval</p>
        </div>
        <div className="bg-gray-100 w-44 py-10 text-center rounded-xl">
          <p>0</p>
          <p>Rejected</p>
        </div>
        <div className="bg-gray-100 w-44 py-10 text-center rounded-xl">
          <p>0</p>
          <p>Closed</p>
        </div>
        <div className="bg-gray-100 w-44 py-10 text-center rounded-xl">
          <p>0</p>
          <p>In Verification</p>
        </div>
        <div className="bg-gray-100 w-44 py-10 text-center rounded-xl">
          <p>0</p>
          <p>In Progress</p>
        </div>
        <div className="bg-gray-100 w-44 py-10 text-center rounded-xl">
          <p>0</p>
          <p>In Hold</p> */}
        {/* </div> */}
      </div>
    </div>
  );
};

export default Status;
