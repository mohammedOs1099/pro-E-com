import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { toast } from "react-toastify";

const ProtectedRoute = ({ children }) => {
  const user = useSelector((state) => state.auth.user);
  if (!user) {
    if (!toast.isActive("auth-error")) {
      toast.error("You must be logged in to access this page.", {
        toastId: "auth-error"
      });
    }
    return <Navigate to="/login" />;
  }


  return children;
};

export default ProtectedRoute;
