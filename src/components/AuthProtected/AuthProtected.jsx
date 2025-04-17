import React from "react";
import { Navigate,  } from "react-router-dom";
import { useSelector } from "react-redux";

const AuthProtected = ({ children }) => {
  const user = useSelector((state) => state.auth.user); 

  
  if (user) {
    return <Navigate to="/" />; 
  }

  return children; 
};

export default AuthProtected;
