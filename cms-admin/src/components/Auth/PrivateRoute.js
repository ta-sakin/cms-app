import axios from "axios";
import React, { useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "../../context/AuthContext";
import Loading from "../shared/Loading";

const PrivateRoute = ({ children }) => {
  const { currentUser: user, loading } = useAuth();
  let location = useLocation();

  if (loading) {
    return <Loading />;
  }

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

export default PrivateRoute;
