import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import MetaData from "../layout/MetaData";
import Loader from "../layout/Loader/Loader";
import { useDispatch, useSelector } from "react-redux";
import "./Profile.css";
import { logout } from "../../actions/UserAction";
import {  toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Profile = () => {
  const dispatch = useDispatch();
  

  const { user, loading} = useSelector((state) => state.user);

  
  function logoutUser() {
    dispatch(logout());
    toast.success("Log Out Successfully!");
  }

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
         
          <MetaData title={`${user.name}'s Profile`} />

          <div className="profileContainer">
            <div>
              <h1>My Profile</h1>
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTYMJoevaeJXBAwvV9ck4XF83C_OLk1esnpb6wOalZXwqJMGsQ6qTkodSy1y1nzB0lr7V4&usqp=CAU"
                alt="profilephoto"
              />

              <Link to="/" onClick={logoutUser}>
                Log Out
              </Link>
            </div>
            <div>
              <div>
                <h4>Name</h4>
                <p>{user.name}</p>
              </div>

              <div>
                <h4>Email</h4>
                <p>{user.email}</p>
              </div>
              <div>
                <h4>Joined On</h4>
                <p>{String(user.createdAt).substr(0, 10)}</p>
              </div>
              <div>
                <Link to="/password/update">Change Password</Link>
                <Link to="/me/update">Edit Profile</Link>
                {user.role === "admin" && (
                  <Link to="/admin/dashboard">Admin Options</Link>
                )}
              </div>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default Profile;
