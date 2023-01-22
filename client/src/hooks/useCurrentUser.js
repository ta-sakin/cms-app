import axios from "axios";
import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";

const useCurrentUser = (phone) => {
  const [loggedUser, setLoggedUser] = useState("");
  useEffect(() => {
    const getUserFromDb = async () => {
      try {
        //get current user from db
        const { data } = await axios.post(
          `https://cms-server.cyclic.app/api/user/current`,
          { phone: phone }
        );
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
