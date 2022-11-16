import axios from "axios";
import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";

const useAdmin = () => {
  const [admin, setAdmin] = useState("");
  console.log("user admin init");
  useEffect(() => {
    const getUserId = async () => {
      try {
        const { data } = await axios.get(
          "http://localhost:5000/api/admin/get",
          {
            headers: {
              authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
          }
        );
        console.log("use admin", data);
        setAdmin(data);
      } catch (error) {
        console.log(error);
      }
    };
    getUserId();
  }, []);

  return [admin];
};

export default useAdmin;
