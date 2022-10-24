import axios from "axios";
import React, { useEffect, useState } from "react";

const useUser = (phone) => {
  const [userId, setUserId] = useState("");
  useEffect(() => {
    const getUserId = async () => {
      try {
        const { data } = await axios.post(
          "http://localhost:5000/api/auth/signin",
          { phone: phone }
        );
        setUserId(data.user._id);
      } catch (error) {
        console.log(error);
      }
    };
    getUserId();
  }, [phone]);
  return [userId];
};

export default useUser;
