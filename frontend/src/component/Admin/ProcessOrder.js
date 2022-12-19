import React, { Fragment, useEffect, useState } from "react"; 
import { useDispatch, useSelector } from "react-redux";
import MetaData from "../layout/MetaData";
import { Typography } from "@mui/material";
import { toast } from "react-toastify";
import { Link,  useParams } from "react-router-dom";
import AccountTreeIcon from "@mui/icons-material/AccountTree";
import Sidebar from "./Sidebar";
import { clearErrors, getOrderDetails, updateOrder } from "../../actions/orderAction";
import Loader from "../layout/Loader/Loader";
import { Button } from '@mui/material';
import { UPDATE_ORDER_RESET } from "../../constants/orderConstants";
import "./ProcessOrder.css"


const ProcessOrder = () => {
  

  const { order , error , loading } = useSelector((state)=> state.orderDetails);
  const {  error:updatedError , isUpdated } = useSelector((state)=> state.order);
  const { id } = useParams();
  const dispatch = useDispatch();


  const updateOrderSubmitHandler = (e) => {
    e.preventDefault();

    const myForm = new FormData();
 
    myForm.set("status" , status);
   

    
    dispatch(updateOrder(id ,myForm))

  };

  const [status, setStatus] = useState("")

  useEffect(() => {
    window.scrollTo(0, 0);



    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }
    
    if (updatedError) {
      toast.error(updatedError);
      dispatch(clearErrors());
    }
    
    if (isUpdated) {
      toast.success("Order Processed Successfully");
      dispatch({type : UPDATE_ORDER_RESET});
    }

    dispatch(getOrderDetails(id));
  }, [ dispatch, error, id , updatedError , isUpdated]);
 
   

  return (
    <Fragment>
        <MetaData title="Process Orders" />
        <div className="dashboard">
            <Sidebar />
            <div className="newProductContainer">
          { loading ? <Loader /> : <div className="confirmOrderPage"
           style={{
            display : order.orderStatus === "Delivered" ? "block" : "grid"
           }}>
        <div>
          <div className="confirmshippingArea">
            <Typography>Shipping Info</Typography>
            <div className="orderDetailsContainerBox">
                <div>
                  <p>Name : </p>
                  <span>{order.user && order.user.name}</span>
                </div>

                <div>
                  <p>Contact Number : </p>
                  <span>
                    {order.shippingInfo && order.shippingInfo.phoneNo}
                  </span>
                </div>
                <div>
                  <p>Address : </p>
                  <span>
                    {order && order.shippingInfo &&
                      `${order.shippingInfo.address},${order.shippingInfo.city},${order.shippingInfo.state},${order.shippingInfo.pinCode},${order.shippingInfo.country}`}
                  </span>
                </div>
              </div>

            <Typography>Payment</Typography>
              <div className="orderDetailsContainerBox">
                <div>
                  <p
                    className={
                      order.paymentInfo &&
                      order.paymentInfo.status === "succeeded"
                        ? "greenColor"
                        : "redColor"
                    }
                  >
                    {order.paymentInfo &&
                    order.paymentInfo.status === "succeeded"
                      ? "PAID"
                      : "NOT PAID"}
                  </p>
                </div>

                <div>
                  <p>Amount : </p>
                  <span>{order.totalPrice && order.totalPrice}</span>
                </div>
              </div>

              <Typography> Order Status </Typography>

              <div className="orderDetailsContainerBox">
                <div>
                  <p
                    className={
                      order.orderStatus && order.orderStatus === "Delivered"
                        ? "greenColor"
                        : "redColor"
                    }
                  >
                    {order.orderStatus && order.orderStatus}
                  </p>
                </div>
              </div>


          </div>
          <div className="confirmCartItems">
            <Typography>Your Cart Items :</Typography>
            <div className="confirmCartItemsContainer">
              {order.orderItems &&
                order.orderItems.map((item) => (
                  <div key={item.product}>
                    <img src={item.image} alt="Product" />
                    <Link to={`/product/${item.product}`}>{item.name}</Link>
                    <span>
                      {item.quantity} X ₹{item.price} ={" "}
                      <b>₹{item.price * item.quantity}</b>
                    </span>
                  </div>
                ))}
            </div>
          </div>
        </div>

        <div 
         style={{
          display : order.orderStatus === "Delivered" ? "none" : "block"
         }}
         >
           <form className='updateOrderForm' 
                onSubmit={updateOrderSubmitHandler}>
            
            <h1>Process Order</h1>



            <div>
                <AccountTreeIcon />
                <select onChange={(e) => setStatus(e.target.value)} >
                    <option value="">Choose Status</option>
                  {order.orderStatus === "Processing" && (  <option value="Shipped">Shipped</option>)}
                  {order.orderStatus === "Shipped" && (  <option value="Delivered">Delivered</option>)}
                    

                    
                </select>
            </div>

         

           

            <Button id='createProductBtn'
            type="submit" disabled = {loading ? true : false || status === "" ? true : false}
            >
                Update
            </Button>

                </form>
        </div>
      </div>}      
      
            </div>
        </div>
    </Fragment>
    
      
     
    
  );
};




export default ProcessOrder