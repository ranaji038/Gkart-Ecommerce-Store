import React from "react";
import { Link } from "react-router-dom";
import "./CartItemCard.css";

const CartItemCard = ({ item, deleteCartItems }) => {
  return (
    <div className="CartItemCard">
      <img src={item.image} alt="Product_Image" />
      <div>
        <Link to={`/product/${item.product}`}>{item.name}</Link>
        <span>{`Price : ₹${item.price}`}</span>
        <p onClick={() => deleteCartItems(item.product)}>Remove From Cart</p>
      </div>
    </div>
  );
};

export default CartItemCard;
