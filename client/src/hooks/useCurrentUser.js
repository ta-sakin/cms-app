import axios from "axios";
import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { SERVER_URL } from "../helper/constant";

const useCurrentUser = (phone) => {
  const [loggedUser, setLoggedUser] = useState("");
  useEffect(() => {
    const getUserFromDb = async () => {
      try {
        //get current user from db
        const { data } = await axios.post(`${SERVER_URL}/api/user/current`, {
          phone: phone,
        });
        setLoggedUser(data);
      } catch (error) {
        console.log(error);
      }
    };
    getUserFromDb();
  }, [phone]);
  return [loggedUser];
};

export default useCurrentUser;
