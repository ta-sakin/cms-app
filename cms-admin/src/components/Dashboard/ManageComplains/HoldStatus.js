import axios from "axios";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { IoIosArrowForward } from "react-icons/io";

const HoldStatus = ({ complain, drawer }) => {
  const [assigned, setAssigned] = useState({});
  const [expand, setExpand] = useState(false);
  const [dateDiff, setDateDiff] = useState(0);

  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get(
          `/admin/assign?cid=${complain._id}&status=hold`
        );
        setAssigned(data);
        if (data) {
          const response = await axios.get(`/admin/statusdate/${complain._id}`);
          if (response) {
            setDateDiff(
              moment(assigned["in hold start"]).from(
                moment(assigned["in hold end"])
              )
            );
            setAssigned({ ...data, ...response.data });
          }
        }
      } catch (error) {
        console.log(error);
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
        <p className="text-white font-semibold py-2">Hold Details</p>
        <IoIosArrowForward
          className={`duration-200 text-white ${
            expand && "transition-transform mb-2 origin-left rotate-90"
          }`}
        />
      </div>
      <div className="pb-8 pt-4 px-3" hidden={!expand}>
        <p>
          <span className="font-semibold">Hold period: </span>
          {!assigned["in hold start"]
            ? "N/A"
            : moment(assigned["in hold start"])
                .from(moment(assigned["in hold end"]))
                ?.replace("ago", "")}
          {/* // : dateDiff > 1
            // ? dateDiff + " days"
            // : dateDiff === 1
            // ? dateDiff + " day"
            // : dateDiff < 1 &&
            //   moment(assigned["in hold end"]).diff(
            //     moment(assigned["in hold start"]),
            //     "hours"
            //   ) + "hr"} */}
        </p>
        <p className="pt-2">
          <span className="font-bold">Admin Remarks:</span>{" "}
          {!assigned["in hold start"] ? "N/A" : assigned?.remarks}
        </p>
      </div>
    </div>
  );
};

export default HoldStatus;
