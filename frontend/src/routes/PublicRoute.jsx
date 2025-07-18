import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const PublicRoute = ({ children }) => {
  const user = useSelector((state) => state.user.user);
  const isAuthenticated = user || localStorage.getItem("user");

  return !isAuthenticated ? children : <Navigate to="/home" />;
};

export default PublicRoute;
