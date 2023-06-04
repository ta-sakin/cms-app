import { Step, Stepper, StepLabel } from "@mui/material";
import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import Complain from "../components/Complains/Complain";
import ProgressBar from "../components/Complains/ProgressBar";
import Loading from "../components/shared/Loading";
import { useAuth } from "../context/AuthContext";
import { SERVER_URL } from "../helper/constant";
import useUser from "../hooks/useUser";

const MyComplain = () => {
  const [userId] = useUser();
  const [complains, setComplains] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        if (!userId) return;
        const { data } = await axios.get(
          `${SERVER_URL}/api/user/complain/${userId}`,
          {
            headers: {
              authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
          }
        );
        setLoading(false);
        setComplains(data);
      } catch (error) {
        setLoading(false);
      }
    })();
  }, [userId]);

  if (loading) {
    return <Loading />;
  }

  if (complains.length === 0) {
    return (
      <p className="mt-20 text-center">You didn't submit any complaints yet.</p>
    );
  }

  return (
    <div className="flex justify-center mt-20">
      <div></div>
      <div>
        {complains?.map((complain) => (
          <div
            key={complain._id}
            className="flex md:flex-row flex-col-reverse items-center sm:items-start"
          >
            <div>
              <Complain
                key={complain._id}
                complain={complain}
                userId={userId}
              />
            </div>
            <div>
              <ProgressBar complain={complain} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyComplain;
