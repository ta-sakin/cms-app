import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import Loading from "../shared/Loading";

const statusList = [
  "Pending approval",
  "In verification",
  "In hold",
  "In progress",
  "Rejected",
  "Closed",
];

const Dashboard = ({ userId }) => {
  const [info, setInfo] = useState({ pendingApproval: 0, totalComplains: 0 });
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get(
          `http://localhost:5000/api/user/complain/count/${userId}`,
          {
            headers: {
              authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
          }
        );
        setLoading(false);
        console.log("data", data);
        setInfo(data);
      } catch (error) {
        setLoading(false);
      }
    })();
  }, [userId]);

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="my-10 max-w-3xl mx-auto">
      <div className="grid grid-cols-2 sm:grid-cols-4 place-items-center gap-8">
        <div className="bg-gray-100 w-44 py-10 text-center">
          <p>{Object.keys(info).length ?? 0}</p>
          <p>ALL Complains</p>
        </div>
        {statusList.map((status, i) => (
          <div
            key={i}
            className="bg-gray-100 w-44 py-10 text-center rounded-xl border-2"
          >
            <p>{info[status.toLowerCase()] ? info[status.toLowerCase()] : 0}</p>
            <p className="capitalized">{status}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
