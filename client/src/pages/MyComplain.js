import { Step, Stepper, StepLabel } from "@mui/material";
import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import Complain from "../components/Complains/Complain";
import ProgressBar from "../components/Complains/ProgressBar";
import Loading from "../components/shared/Loading";
import { useAuth } from "../context/AuthContext";
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
          `http://localhost:5000/api/user/complain/${userId}`,
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
        console.log(error);
      }
    })();
  }, [userId]);

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="flex justify-center mt-20">
      <div></div>
      <div>
        {complains?.map((complain) => (
          <div className="flex md:flex-row flex-col-reverse items-center sm:items-start">
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