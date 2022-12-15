import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import UnauthError from "../components/shared/UnauthError";
import Spin from "../components/shared/Spin";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

const useAdmin = () => {
  const [admin, setAdmin] = useState("");
  const { logout } = useAuth();

  useEffect(() => {
    const getUserId = async () => {
      try {
        const { data } = await axios.get("/admin/user");
        setAdmin(data);
      } catch (error) {
        if (error?.response?.status === 403) {
          logout();
          toast.error(
            "Please try login again.",
            { toastId: "error" }
          );
        }
      }
    };
    getUserId();
  }, []);
  return [admin];
};

export default useAdmin;
