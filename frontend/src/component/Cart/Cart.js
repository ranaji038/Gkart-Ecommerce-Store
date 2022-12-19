import { Typography } from "@mui/material";
import React, { Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { addItemsToCart, removeItemsFromCart } from "../../actions/cartActions";
import "./Cart.css";
import CartItemCard from "./CartItemCard.js";
import RemoveShoppingCartIcon from "@mui/icons-material/RemoveShoppingCart";

const Cart = () => {
  const dispatch = useDispatch();
  const { cartItems } = useSelector((state) => state.cart);
  const navigate = useNavigate();

  const increaseQuantity = (id, quantity, stock) => {
    const newqty = quantity + 1;
    if (stock <= quantity) {
      toast.error("Out of Stock");

      return;
    }
    dispatch(addItemsToCart(id, newqty));
  };

  const decreaseQuantity = (id, quantity) => {
    const newqty = quantity - 1;
    if (1 >= quantity) {
      toast.error("Quantity can't be less than one");
      return;
    }
    dispatch(addItemsToCart(id, newqty));
  };

  const deleteCartItems = (id) => {
    toast.success("Item Removed From the Cart");
    dispatch(removeItemsFromCart(id));
  };

  const checkoutHandler = () => {
    navigate("/shipping");
  };
  return (
    <Fragment>
      {cartItems.length === 0 ? (
        <div className="emptyCart">
          <RemoveShoppingCartIcon />
          <Typography>No Products in Your Cart</Typography>
          <Link to="/products">View Products</Link>
        </div>
      ) : (
        <Fragment>
          <div className="cartPage">
            <div className="cartHeader">
              <p>Product</p>
              <p>Quantity</p>
              <p>SubTotal</p>
            </div>

            {cartItems &&
              cartItems.map((item, index) => (
                <div className="cartContainer" key={item.product}>
                  <CartItemCard item={item} deleteCartItems={deleteCartItems} />
                  <div className="cartInput">
                    <button
                      onClick={() =>
                        decreaseQuantity(item.product, item.quantity)
                      }
                    >
                      -
                    </button>
                    <input type="number" value={item.quantity} readOnly />
                    <button
                      onClick={() =>
                        increaseQuantity(
                          item.product,
                          item.quantity,
                          item.stock
                        )
                      }
                    >
                      +
                    </button>
                  </div>
                  <p className="cartSubtotal">{`₹${
                    item.price * item.quantity
                  }`}</p>
                </div>
              ))}

            <div className="cartGrossTotal">
              <div></div>
              <div className="cartGrossTotalBox">
                <p>Gross Total</p>
                <p>{`₹${cartItems.reduce(
                  (acc, item) => acc + item.quantity * item.price,
                  0
                )}`}</p>
                {/* Using reduce we can run it for evert object  */}
              </div>
              <div></div>
              <div className="checkOutBtn">
                <button onClick={checkoutHandler}>Order Now</button>
              </div>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default Cart;
