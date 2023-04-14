import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import "./Header.css";
import { useSelector } from "react-redux";
import logo from "../../../logo.png"

const Header = () => {
  const navigate = useNavigate();
  const [keyword, setKeyword] = useState("");
  const { isAuthenticated, user } = useSelector((state) => state.user);
  const { cartItems } = useSelector((state) => state.cart);

  const searchSubmitHandler = (e) => {
    // e.preventDefault();
    if (keyword.trim()) {
      navigate(`/products/${keyword}`);
    } else {
      navigate("/products");
    }
  };

  return (
    <div className="header">
      <Link to="/">
        <img
          src={logo}
          className="header_logo"
          alt="logo-Gkart"
        />
      </Link>

      <div className="header_search">
        <input
          className="header_searchInput"
          type="text"
          onChange={(e) => setKeyword(e.target.value)}
          onKeyPress={(e) => {
            e.key === "Enter" && searchSubmitHandler()

          }}
        />
        <button className="search-btn" onClick={searchSubmitHandler}>
          <SearchIcon />
        </button>
        {/*logo*/}
      </div>

      <div className="header_nav">
        <Link to={"/login"}>
          <div className="header_option">
            <span className="header_optionLineOne">
              {" "}
              Hello {user ? "" : "Guest"}
            </span>
            <span className="header_optionLineTwo">
              {user ? user.name : "Sign In"}
            </span>
          </div>
        </Link>
        <Link to="/orders">
          <div className="header_option">
            <span className="header_optionLineOne">Returns</span>
            <span className="header_optionLineTwo">& Orders</span>
          </div>
        </Link>
        {isAuthenticated && (
          <Link to="/account">
            <div className="header_option">
              <span className="header_optionLineOne">Your</span>
              <span className="header_optionLineTwo">Profile</span>
            </div>
          </Link>
        )}
        <Link to="/cart">
          <div className="header_optionCart">
            <ShoppingCartOutlinedIcon
              style={{
                color: cartItems.length > 0 ? "rgb(13, 123, 333)" : "unset",
              }}
            />
            <span className="header_optionLineTwo header_CartCount">
              {cartItems.length}
            </span>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Header;
