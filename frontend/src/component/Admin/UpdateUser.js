import React, { Fragment, useEffect, useState } from 'react'
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import PersonIcon from "@mui/icons-material/Person";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from 'react-redux';
import { Button } from '@mui/material';
import MetaData from '../layout/MetaData';
import Sidebar from './Sidebar';
import {  useNavigate, useParams } from 'react-router-dom';
import { UPDATE_USER_RESET } from '../../constants/userConstants';
import { getUserDetails, updateUser , clearErrors } from '../../actions/UserAction';
import Loader from '../layout/Loader/Loader';


const UpdateUser = () => {

    const { id } = useParams();
    
const dispatch = useDispatch();
const navigate = useNavigate();

 const { loading , error, user} = useSelector((state) =>state.userDetails);

 const { loading : updateLoading , error: updateError, isUpdated} = useSelector((state) =>state.profile);

const [name, setName] = useState("")   ;
const [email, setEmail] = useState("");
const [role, setRole] = useState("")



    useEffect(() => {

        if(user && user._id !== id){
            dispatch(getUserDetails(id));
        }else{
            setName(user.name);
            setEmail(user.email);
            setRole(user.role)
            
        }

      if(error){
        toast.error(error);
        dispatch(clearErrors);
      }
      if(updateError){
        toast.error(updateError);
        dispatch(clearErrors);
      }

      if(isUpdated){
        toast.success("User Updated Successfully!!!");
        navigate("/admin/users");
        dispatch({type : UPDATE_USER_RESET})
      }

    }, [dispatch , error , isUpdated,id , user ,updateError , navigate])

    const updateUserSubmitHandler = (e) =>{
        e.preventDefault();

        const myForm = new FormData();

        myForm.set("name" , name);
        myForm.set("email" , email);
        myForm.set("role" , role);
       

        
        dispatch(updateUser(id , myForm))



    }

  


    
  
  return (
    <Fragment>
        <MetaData title="Update User Details" />
        <div className="dashboard">
            <Sidebar />
            <div className="newProductContainer">
                { loading  ? <Loader /> : <form className='createProductForm' 
                onSubmit={updateUserSubmitHandler}>
            
            <h1>Update User Details</h1>

            <div>
                <PersonIcon />
                <input type="text"
                placeholder='Name'
                required
                value={name}
                onChange={(e)=> setName(e.target.value)} />
            </div>
            
            <div>
                <MailOutlineIcon />
                <input type="email"
                placeholder='Email'
                required
                value={email}
                onChange={(e)=> setEmail(e.target.value)} />
            </div>

            

            <div>
                <VerifiedUserIcon />
                <select value={role} onChange={(e) => setRole(e.target.value)} >
                    <option value="">Choose Role</option>
                    <option value="admin">Admin</option>
                    <option value="user">User</option>

                </select>
            </div>

          

            <Button id='createProductBtn'
            type="submit" disabled = {updateLoading ? true : false || role === "" ? true : false }
            >
                Update
            </Button>

                </form>}
            </div>
        </div>
    </Fragment>
  )
}



export default UpdateUser