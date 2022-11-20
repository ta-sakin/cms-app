import axios from "axios";
import React, { useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "../../context/AuthContext";
import Loading from "../shared/Loading";

const PrivateRoute = ({ children }) => {
  const { currentUser: user, logout, loading } = useAuth();
  const [admin, setAdmin] = useState({});
  const [authorized, setAuthorized] = useState(true);
  let location = useLocation();
  // useEffect(() => {
  //   const getUserId = async () => {
  //     try {
  //       const { data } = await axios.get("/admin/auth/jwt");
  //       setAdmin(data);
  //       setAuthorized(false);
  //     } catch (error) {
  //       console.log(error);
  //       setAuthorized(false);
  //       if (error.response?.status === 401 || error.response?.status === 403) {
  //         await logout();
  //         toast.error("Unauthorized access, Please login again.", {
  //           theme: "colored",
  //         });
  //       }
  //     }
  //   };
  //   getUserId();
  // }, [logout]);

  if (loading) {
    return <Loading />;
  }

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

export default PrivateRoute;
