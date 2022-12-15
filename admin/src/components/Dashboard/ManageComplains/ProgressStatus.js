import axios from "axios";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { IoIosArrowForward } from "react-icons/io";

const ProgressStatus = ({ complain, drawer }) => {
  const [assigned, setAssigned] = useState({});
  const [expand, setExpand] = useState(false);
  useEffect(() => {
    (async () => {
      const { data } = await axios.get(
        `/admin/assign?cid=${complain._id}&status=progress`
      );
      const response = await axios.get(`/admin/statusdate/${complain._id}`);
      if (response) {
        setAssigned({ ...data, ...response.data });
      }
    })();
  }, [complain._id]);

  return (
    <div
      className={`rounded-lg bg-gray-100 w-full max-w-sm ${
        drawer && "mx-auto"
      }`}
    >
      <div
        className="cursor-pointer bg-gray-500 rounded-lg px-4 hover:bg-gray-600 flex justify-between items-center h-fit"
        onClick={() => setExpand(!expand)}
      >
        <p className="text-white font-semibold py-2">Progress Details</p>
        <IoIosArrowForward
          className={`duration-200 text-white ${
            expand && "transition-transform mb-2 origin-left rotate-90"
          }`}
        />
      </div>
      <div className="pb-8 pt-4 px-3" hidden={!expand}>
        <p>
          <span className="font-semibold">In progress since: </span>
          {moment(assigned["in progress start"]).format("D MMM, YYYY hh:mm a")}
        </p>
        <p className="font-bold py-2">Assigned To:</p>
        <p>
          <span className="font-semibold">Name:</span> {assigned?.name}
        </p>
        <p>
          <span className="font-semibold">Email:</span> {assigned?.email}
        </p>
        <p>
          <span className="font-semibold">Contact:</span> {assigned?.contact}
        </p>
        <p>
          <span className="font-semibold">Designation:</span>{" "}
          {assigned?.designation}
        </p>
        <p className="pt-2">
          <span className="font-bold">Admin Remarks:</span> {assigned?.remarks}
        </p>
      </div>
    </div>
  );
};

export default ProgressStatus;
