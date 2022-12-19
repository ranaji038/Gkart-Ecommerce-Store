import React, { useEffect } from 'react'
import Sidebar from "./Sidebar.js"
import "./dashboard.css"
import { Typography } from '@mui/material'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getAdminProduct } from '../../actions/ProductAction.js'
import { getAllOrders } from '../../actions/orderAction.js'
import { getAllUsers } from '../../actions/UserAction.js'





const Dashboard = () => {
  const {products } = useSelector((state)=>state.products);
  const { orders } = useSelector((state)=> state.allOrders);
  const { users } = useSelector((state)=> state.allUsers);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAdminProduct());
    dispatch(getAllOrders());
    dispatch(getAllUsers());
   
  }, [dispatch]);

  let totalAmount = 0;
  orders && orders.forEach((item) => {
    totalAmount += item.totalPrice;
  });
  
  return (
    <div className='dashboard'>
        <Sidebar />
        <div className='dashboardContainer'>

      <Typography component="h1">DashBoard</Typography>
      <div className="dashboardSummary">
        <div>
          <p>
            Total Amount <br /> ₹{totalAmount}
          </p>
        </div>

        <div className="dashboardSummaryBox2">
        <Link to="/admin/products">
          <p>Products</p>
          <p>{products && products.length}</p>
        </Link> <Link to="/admin/orders">
          <p>Orders</p>
          <p>{orders && orders.length}</p>
          
        </Link>
        <Link to="/admin/users">
          <p>Users</p>
          <p>{users && users.length}</p>
          
        </Link>
        </div>

      </div>

      {/* Graphs for display of data  {Version update Error} */}

      {/* <div className="lineChart">
          <Line data={lineState} />
        </div> */}



        </div>
    </div>
  )
}

export default Dashboard