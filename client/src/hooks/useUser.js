import axios from "axios";
import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";

const useUser = (phone) => {
  const { currentUser: user } = useAuth();
  const [userId, setUserId] = useState("");
  useEffect(() => {
    const getUserId = async () => {
      try {
        const { data } = await axios.post(
          "https://cms-server-production.up.railway.app/api/user/auth/signin",
          { phone: user?.phoneNumber }
        );
        setUserId(data.user._id);
      } catch (error) {
        console.log(error);
      }
    };
    getUserId();
  }, [user]);
  return [userId];
};

export default useUser;
