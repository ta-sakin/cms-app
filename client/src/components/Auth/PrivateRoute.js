import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "../../context/AuthContext";
import useToken from "../../hooks/useToken";
import Loading from "../shared/Loading";

const PrivateRoute = ({ children }) => {
  const { currentUser: user, loading } = useAuth();
  // const [token] = useToken(user.phoneNumber);
  let location = useLocation();

  if (loading) {
    return <Loading />;
  }

  if (!user) {
    // logout();
    // toast.error("Unauthorized access", { theme: "colored" });
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

export default PrivateRoute;
