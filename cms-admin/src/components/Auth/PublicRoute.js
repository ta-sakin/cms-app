import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import Loading from "../shared/Loading";

const PublicRoute = ({ children }) => {
  const { currentUser: user, loading } = useAuth();
  let location = useLocation();
  if (loading) {
    return <Loading />;
  }

  if (user) {
    return <Navigate to="/dashboard" state={{ from: location }} replace />;
  }

  return children;
};

export default PublicRoute;
