import "./App.css";
import Header from "./component/layout/Header/Header.js";
import Footer from "./component/layout/Footer/Footer.js";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./component/Home/Home.js";
import data from "./data.json";
import ProductDetails from "./component/Product/ProductDetails.js";
import Products from "./component/Product/Products.js";
import LoginSignUp from "./component/User/LoginSignUp";
import React, { useEffect, useState } from "react";
import store from "./store";
import { loadUser } from "./actions/UserAction";
import Profile from "./component/User/Profile.js";
import UpdateProfile from "./component/User/UpdateProfile.js";
import UpdatePassword from "./component/User/UpdatePassword.js";
import ForgotPassword from "./component/User/ForgotPassword.js";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Cart from "./component/Cart/Cart.js";
import Shipping from "./component/Cart/Shipping.js";
import ConfirmOrder from "./component/Cart/ConfirmOrder.js";
import axios from "axios";
import Payment from "./component/Cart/Payment.js";
import OrderSuccess from "./component/Cart/OrderSuccess.js";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import MyOrders from "./component/Order/MyOrders.js";
import OrderDetails from "./component/Order/OrderDetails.js";
import Dashboard from "./component/Admin/Dashboard.js"
import NewProduct from "./component/Admin/NewProduct.js"
import UpdateProduct from "./component/Admin/UpdateProduct.js"
import ProtectedRoute from "./component/Route/ProtectedRoute.js";
import ProductList from "./component/Admin/ProductList.js";
import OrderList from "./component/Admin/OrderList.js";
import ProcessOrder from "./component/Admin/ProcessOrder.js";
import UserList from "./component/Admin/UserList.js";
import UpdateUser from "./component/Admin/UpdateUser.js";
import ProductReviews from "./component/Admin/ProductReviews.js";
import NotFound from "./component/layout/Not Found/NotFound.js"


import { useSelector } from "react-redux";


function App() {
  
  const {  isAuthenticated  } = useSelector((state) => state.user);

  const [stripeApiKey, setStripeApiKey] = useState("");

  async function getStripeApiKey() {
    const { data } = await axios.get("/api/v1/stripeapikey");

    setStripeApiKey(data.stripeApiKey);
  }

  useEffect(() => {
    window.scrollTo(0, 0);
    store.dispatch(loadUser());
    getStripeApiKey();
  }, []);

  return (
    <Router>
      <Header />
      <Routes>
        <Route
          exact
          path="/"
          element={<Home start={data.banner.newstart} />}
        ></Route>
        <Route exact path="/product/:id" element={<ProductDetails />}></Route>
        <Route exact path="/products" element={<Products />}></Route>
        <Route path="/products/:keyword" element={<Products />}></Route>
        <Route path="/login" element={<LoginSignUp />}></Route>
        <Route path="/password/forgot" element={<ForgotPassword />}></Route>
        <Route path="/cart" element={<Cart />}></Route>

        <Route element={<ProtectedRoute isAuthenticated={isAuthenticated} />}>
          {stripeApiKey && (
            <Route
              path="/process/payment"
              element={
                <Elements stripe={loadStripe(stripeApiKey)}>
                  <Payment />
                </Elements>
              }
            ></Route>
          )}
        </Route>
       

      {/* User Protected Routes  */}
              
        <Route element={<ProtectedRoute isAuthenticated={isAuthenticated} />}>
        <Route path="/account" element={<Profile />}></Route>
        <Route path="/me/update" element={<UpdateProfile />}></Route>
        <Route path="/password/update" element={<UpdatePassword />}></Route>
        <Route path="/shipping" element={<Shipping />}></Route>
        <Route path="/success" element={<OrderSuccess />}></Route>
        <Route path="/orders" element={<MyOrders />}></Route>
        <Route path="/order/confirm" element={<ConfirmOrder />}></Route>
        <Route path="/order/:id" element={<OrderDetails />}></Route>
        </Route>
          
       {/* Admin Protected Routes  */}
       <Route element={<ProtectedRoute isAuthenticated={isAuthenticated} adminRoute={true} />}>
        <Route path="/admin/dashboard"  element={<Dashboard />}></Route>

        <Route path="/admin/products"  element={<ProductList />}></Route>

        <Route path="/admin/product"  element={<NewProduct />}></Route>

        <Route path="/admin/product/:id"  element={<UpdateProduct />}></Route>

        <Route path="/admin/orders"  element={<OrderList />}></Route>
        <Route path="/admin/order/:id"  element={<ProcessOrder />}></Route>
        <Route path="/admin/users"  element={<UserList />}></Route>
        <Route path="/admin/user/:id"  element={<UpdateUser />}></Route>
        <Route path="/admin/reviews"  element={<ProductReviews />}></Route>


          
        </Route>

        <Route path="*" element= {
          window.location.pathname === "/process/payment" ? null : <NotFound />
        }    ></Route>

      </Routes>

      <Footer />
      <ToastContainer
        position="bottom-center"
        autoClose={2000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </Router>
  );
}

export default App;
