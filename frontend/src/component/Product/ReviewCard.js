import { Rating } from "@mui/material";
import React from "react";

import profilePng from "../../Images/profilepng.png";
const ReviewCard = ({ review }) => {
  const options = {
    value: review.rating,
    size: "medium",
    readOnly: true,
    precision: 0.5,
  };

  return (
    <div className="reviewCard">
      <img src={profilePng} alt="User" />
      <p>{review.name}</p>
      <Rating {...options} />
      <span>{review.comment}</span>
    </div>
  );
};

export default ReviewCard;
