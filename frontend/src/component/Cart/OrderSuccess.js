import React, { useEffect } from "react";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import "./orderSuccess.css";
import { Typography } from "@mui/material";
import { Link } from "react-router-dom";



const OrderSuccess = () => {


 

  useEffect(() => {
    window.scrollTo(0, 0);
  
  }, []);

  return (
    <div className="OrderSuccess">
      <CheckCircleIcon />

      <Typography>Your Order has been Placed Successfully</Typography>
      <Link to="/orders">View Orders</Link>
    </div>
  );
};

export default OrderSuccess;
