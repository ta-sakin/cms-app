import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useAuth } from "../context/AuthContext";

const useAdmin = () => {
  const { logout } = useAuth();
  const [admin, setAdmin] = useState("");
  useEffect(() => {
    const getUserId = async () => {
      try {
        const { data } = await axios.get("/admin/user");
        setAdmin(data);
      } catch (error) {
        console.log(error);
        if (error.response?.status === 401 || error.response?.status === 403) {
          await logout();
          toast.error("Unauthorized access, Please login again.", {
            theme: "colored",
          });
          return;
        }
      }
    };
    getUserId();
  }, [logout]);

  return [admin];
};

export default useAdmin;
