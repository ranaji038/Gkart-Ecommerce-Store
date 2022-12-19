import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { toast } from "react-toastify";


const ProtectedRoute = ({
  isAuthenticated,
  children,
  adminRoute = false,
  
 
}) => {
    
  const {  user  } = useSelector((state) => state.user);

  

  if (!isAuthenticated) {
    toast.error("Kindly Login or Signup !!!")
    return <Navigate to="/login" />;
  }

  if (adminRoute && user.role !== "admin") {
    toast.error("Access Denied!!!")
    return <Navigate to="/login" />;
  }

  return children ? children : <Outlet />;
};

export default ProtectedRoute;