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
import { getAllUsers , clearErrors, deleteUser} from '../../actions/UserAction';
import { DELETE_USER_RESET } from '../../constants/userConstants';


const UserList = () => {
  const dispatch = useDispatch();
  const naviagate = useNavigate();
  const {error , users  } = useSelector((state)=>state.allUsers);

  const { error: deleteError , isDeleted , message} = useSelector((state)=>state.profile)

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
      toast.success(message);
      naviagate("/admin/users");
      dispatch({type : DELETE_USER_RESET})
    }

    dispatch(getAllUsers());
  }, [error , dispatch, deleteError , isDeleted , naviagate , message])
  

  const deleteUserHandler = (userid) => {
    dispatch(deleteUser(userid));
  }


  const columns = [
    { field: "id", headerName: "User ID", minWidth: 180, flex: 0.8 },

    {
      field: "email",
      headerName: "Email",
      minWidth: 200,
      flex: 1,
      
    },
    {
      field: "name",
      headerName: "Name",
      type: "String",
      minWidth: 150,
      flex: 0.5,
    },
    {
      field: "role",
      type: "String",
      headerName: "Role",
      minWidth: 150,
      flex: 0.5,
      cellClassName: (params) => {
        return params.getValue(params.id, "role") === "admin"
          ? "greenColor"
          : "redColor";
      },
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

          <Link to={`/admin/user/${params.getValue(params.id, "id")}`}>
            <EditIcon />
          </Link>

          <Button onClick={()=>{deleteUserHandler(params.getValue(params.id, "id"))}}>
            <DeleteIcon />
          </Button>
          </Fragment>

        );
      },
    },
  ];
  const rows = [];

  users && users.forEach((item) => {
    rows.push({
 
      id : item._id,
      role : item.role,
      email : item.email,
      name : item.name,
    })
  })

  return (
    <Fragment>
      <MetaData title={`ALL USERS DETAILS -- Admin`} />
      <div className="dashboard">
        <Sidebar />
        <div className="productListContainer">
          <h1 id="productListHeading">ALL USERS DETAILS</h1>

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


export default UserList