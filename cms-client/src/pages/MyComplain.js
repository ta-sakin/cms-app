import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import Complain from "../components/Complains/Complain";
import Loading from "../components/shared/Loading";
import { useAuth } from "../context/AuthContext";
import useUser from "../hooks/useUser";

const MyComplain = () => {
  const [userId] = useUser();
  const [complains, setComplains] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        if (!userId) return;
        const { data } = await axios.get(
          `http://localhost:5000/api/complains/${userId}`,
          {
            headers: {
              authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
          }
        );
        setComplains(data);
      } catch (error) {
        console.log(error);
      }
    })();
  }, [userId]);

  if (complains?.length < 1) {
    return <Loading />;
  }

  return (
    <div className="flex justify-center mt-20">
      <div></div>
      <div>
        {complains?.map((complain) => (
          <Complain key={complain._id} complain={complain} userId={userId} />
        ))}
      </div>
    </div>
  );
};

export default MyComplain;