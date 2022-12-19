import React, { Fragment, useEffect, useState } from 'react'
import "./productReviews.css"
import StarIcon from "@mui/icons-material/Star";
import DeleteIcon from "@mui/icons-material/Delete";
import Sidebar from './Sidebar';
import { toast } from "react-toastify";
import { useDispatch, useSelector } from 'react-redux';
import { Button } from '@mui/material';
import MetaData from '../layout/MetaData';
import { DataGrid } from '@mui/x-data-grid';
import {  useNavigate } from 'react-router-dom';
import { DELETE_REVIEW_RESET } from '../../constants/ProductConstants';
import { getAllReviews , clearErrors, deleteReviews} from '../../actions/ProductAction';



const ProductReviews = () => {
  const dispatch = useDispatch();
  const naviagate = useNavigate();
  const { error: deleteError, isDeleted } = useSelector(
    (state) => state.review
  );

  const { error, reviews, loading } = useSelector(
    (state) => state.productReviews
  );
  const [productId, setProductId] = useState("");

  useEffect(() => {

    if(productId.length === 24){
    dispatch(getAllReviews(productId));

    }
    
    if(error){
      toast.error(error);
      dispatch(clearErrors());
    }

    if(deleteError){
      toast.error(deleteError);
      dispatch(clearErrors());
    }

    if(isDeleted){
      toast.success("Review Deleted Successfully");
      naviagate("/admin/reviews");
      dispatch({type : DELETE_REVIEW_RESET})
    }

    
  }, [error , dispatch, deleteError , isDeleted , naviagate , productId])
  

  const deleteReviewHandler = (reviewsId) => {
    dispatch(deleteReviews(reviewsId, productId));
  }

  const productReviewsSubmitHandler = (e) => {
    e.preventDefault();

    dispatch(getAllReviews(productId));

  }


  const columns = [
    { field: "id", headerName: "Review ID", minWidth: 200, flex: 0.5 },

    {
      field: "user",
      headerName: "User",
      minWidth: 200,
      flex: 0.6,
      
    },
    {
      field: "comment",
      headerName: "Comment",
      minWidth: 350,
      flex: 1,
    },
    {
      field: "rating",
      type: "number",
      headerName: "Rating",
      minWidth: 180,
      flex: 0.3,
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

          <Button onClick={()=>{deleteReviewHandler(params.getValue(params.id, "id"))}}>
            <DeleteIcon />
          </Button>
          </Fragment>

        );
      },
    },
  ];
  const rows = [];

  reviews && reviews.forEach((item) => {
    rows.push({
 
      id : item._id,
      rating : item.rating,
      comment : item.comment,
      user : item.name,
    })
  })

  return (
    <Fragment>
      <MetaData title={`ALL Reviews -- Admin`} />
      <div className="dashboard">
        <Sidebar />
        <div className="productReviewsContainer">
        <form className='productReviewsForm' 
                onSubmit={productReviewsSubmitHandler}>
            
            <h1 className='productReviewsFormHeading'>ALL REVIEWS</h1>

            <div>
                <StarIcon />
                <input type="text"
                placeholder='Product ID'
                required
                value={productId}
                onChange={(e)=> setProductId(e.target.value)} />
            </div>
            
             

            <Button id='createProductBtn'
            type="submit" disabled = {loading ? true : false || productId === "" ? true : false }
            >
                Search
            </Button>

                </form>

          {reviews && reviews.length > 0 ? (
            <DataGrid 
            rows={rows}
            columns={columns}
            pageSize={10}
            disableSelectionOnClick
            className='productListTable'
            autoHeight />
          ) : (
            <h1 className='productReviewFormHeading'>No Reviews Found</h1>
          )}


        </div>
      </div>
    </Fragment>
  )
}

export default ProductReviews