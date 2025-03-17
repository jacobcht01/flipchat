import React from "react";
import { useAuthContext } from "../context/AuthContext";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const { currentUser } = useAuthContext();

  return currentUser === null ? <Navigate to={"/"} /> : {children};
};

export default ProtectedRoute;
