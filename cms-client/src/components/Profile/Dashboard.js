import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import Loading from "../shared/Loading";

const Dashboard = ({ userId }) => {
  const [info, setInfo] = useState({ pendingApproval: 0, totalComplains: 0 });
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get(
          `http://localhost:5000/api/complain/${userId}`,
          {
            headers: {
              authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
          }
        );
        setLoading(false);
        setInfo({ ...data });
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
          <p>{info?.totalComplains}</p>
          <p>ALL Complains</p>
        </div>
        <div className="bg-gray-100 w-44 py-10 text-center">
          <p>{info?.pendingApproval}</p>
          <p>Pending Approval</p>
        </div>
        <div className="bg-gray-100 w-44 py-10 text-center">
          <p>0</p>
          <p>Approval</p>
        </div>
        <div className="bg-gray-100 w-44 py-10 text-center">
          <p>0</p>
          <p>Rejected</p>
        </div>
        <div className="bg-gray-100 w-44 py-10 text-center">
          <p>0</p>
          <p>Closed</p>
        </div>
        <div className="bg-gray-100 w-44 py-10 text-center">
          <p>0</p>
          <p>In Verification</p>
        </div>
        <div className="bg-gray-100 w-44 py-10 text-center">
          <p>0</p>
          <p>In Progress</p>
        </div>
        <div className="bg-gray-100 w-44 py-10 text-center">
          <p>0</p>
          <p>In Hold</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
