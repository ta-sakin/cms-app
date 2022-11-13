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
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    (async () => {
      try {
        if (!userId) return;
        const { data } = await axios.get(
          `https://cms-server-production.up.railway.app/api/complains/${userId}`,
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
          <Complain key={complain._id} complain={complain} userId={userId} />
        ))}
      </div>
    </div>
  );
};

export default MyComplain;
