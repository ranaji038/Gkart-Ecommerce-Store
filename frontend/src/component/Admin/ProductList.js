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
import { getAdminProduct , clearErrors, deleteProduct } from '../../actions/ProductAction'
import { DELETE_PRODUCT_RESET } from '../../constants/ProductConstants';


const ProductList = () => {
  const dispatch = useDispatch();
  const naviagate = useNavigate();
  const {error , products } = useSelector((state)=>state.products);

  const { error: deleteError , isDeleted} = useSelector((state)=>state.product)

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
      toast.success("Product Deleted Successfully");
      naviagate("/admin/dashboard");
      dispatch({type : DELETE_PRODUCT_RESET})
    }

    dispatch(getAdminProduct());
  }, [error , dispatch, deleteError , isDeleted , naviagate])
  

  const deleteProductHandler = (id) => {
    dispatch(deleteProduct(id));
  }


  const columns = [
    { field: "id", headerName: "Product ID", minWidth: 200, flex: 0.5 },

    {
      field: "name",
      headerName: "Name",
      minWidth: 350,
      flex: 1,
      
    },
    {
      field: "stock",
      headerName: "Stock",
      type: "number",
      minWidth: 150,
      flex: 0.3,
    },
    {
      field: "price",
      type: "number",
      headerName: "Price",
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

          <Link to={`/admin/product/${params.getValue(params.id, "id")}`}>
            <EditIcon />
          </Link>

          <Button onClick={()=>{deleteProductHandler(params.getValue(params.id, "id"))}}>
            <DeleteIcon />
          </Button>
          </Fragment>

        );
      },
    },
  ];
  const rows = [];

  products && products.forEach((item) => {
    rows.push({
 
      id : item._id,
      stock : item.stock,
      price : item.price,
      name : item.name,
    })
  })

  return (
    <Fragment>
      <MetaData title={`ALL Products -- Admin`} />
      <div className="dashboard">
        <Sidebar />
        <div className="productListContainer">
          <h1 id="productListHeading">ALL PRODUCTS</h1>

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

export default ProductList