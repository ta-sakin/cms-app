import axios from "axios";
import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { SERVER_URL } from "../helper/constant";

const useUser = (phone) => {
  const { currentUser: user } = useAuth();
  const [userId, setUserId] = useState("");

  useEffect(() => {
    // console.log("user id use user", userId);
    const getUserId = async () => {
      try {
        const { data } = await axios.post(
          `${SERVER_URL}/api/user/auth/signin`,
          {
            phone: user?.phoneNumber,
          }
        );
        setUserId(data.user._id);
      } catch (error) {
        console.log(error);
      }
    };
    user && getUserId();
  }, [user]);
  return [userId];
};

export default useUser;
