import React, { Fragment, useEffect } from 'react'
import "./productlist.css"
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Sidebar from './Sidebar';
import { toast } from "react-toastify";
import { useDispatch, useSelector } from 'react-redux';
import { Button } from '@mui/material';
import MetaData from '../layout/MetaData';
import { DataGrid } from '@mui/x-data-grid';
import { Link, useNavigate } from 'react-router-dom';
import { deleteOrder, getAllOrders , clearErrors } from '../../actions/orderAction';
import { DELETE_ORDER_RESET } from '../../constants/orderConstants';


const OrderList = () => {
  const dispatch = useDispatch();
  const naviagate = useNavigate();
  const {error , orders } = useSelector((state)=>state.allOrders);

  const { error: deleteError , isDeleted} = useSelector((state)=>state.order)

  useEffect(() => {
    
    if(error){
      toast.error(error);
      dispatch(clearErrors());
    }

    if(deleteError){
      toast.error(deleteError);
      dispatch(clearErrors());
    }

    if(isDeleted){
      toast.success("Order Deleted Successfully");
      naviagate("/admin/orders");
      dispatch({type : DELETE_ORDER_RESET})
    }

    dispatch(getAllOrders());
  }, [error , dispatch, deleteError , isDeleted , naviagate])
  

  const deleteOrderHandler = (id) => {
    dispatch(deleteOrder(id));
  }


  const columns = [
    { field: "id", headerName: "Order ID", minWidth: 300, flex: 1 },

    {
      field: "status",
      headerName: "Status",
      minWidth: 150,
      flex: 0.5,
      cellClassName: (params) => {
        return params.getValue(params.id, "status") === "Delivered"
          ? "greenColor"
          : "redColor";
      },
    },
    {
      field: "itemsQty",
      headerName: "Items Qty",
      type: "number",
      minWidth: 150,
      flex: 0.4,
    },
    {
      field: "amount",
      type: "number",
      headerName: "Amount",
      minWidth: 270,
      flex: 0.5,
    },
    {
      field: "actions",
      type: "number",
      headerName: "Actions",
      minWidth: 150,
      flex: 0.3,
      sortable: false,
      renderCell: (params) => {
        return (  
          <Fragment>

          <Link to={`/admin/order/${params.getValue(params.id, "id")}`}>
            <EditIcon />
          </Link>

          <Button onClick={()=>{deleteOrderHandler(params.getValue(params.id, "id"))}}>
            <DeleteIcon />
          </Button>
          </Fragment>

        );
      },
    },
  ];
  const rows = [];

  orders && orders.forEach((item) => {
    rows.push({
 
      id : item._id,
      itemsQty : item.orderItems.length,
      amount : item.totalPrice,
      status : item.orderStatus,
    })
  })

  return (
    <Fragment>
      <MetaData title={`ALL Orders -- Admin`} />
      <div className="dashboard">
        <Sidebar />
        <div className="productListContainer">
          <h1 id="productListHeading">ALL Orders</h1>

          <DataGrid 
            rows={rows}
            columns={columns}
            pageSize={10}
            disableSelectionOnClick
            className='productListTable'
            autoHeight />


        </div>
      </div>
    </Fragment>
  )
}



export default OrderList