import axios from "axios";
import React, { useEffect, useState } from "react";

const useAdmin = () => {
  const [admin, setAdmin] = useState("");
  useEffect(() => {
    const getUserId = async () => {
      try {
        const { data } = await axios.get("/admin/user");
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
