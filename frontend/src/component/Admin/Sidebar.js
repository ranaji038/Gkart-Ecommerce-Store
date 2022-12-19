import React from 'react'
import "./Sidebar.css"
// import logo from "../../Images/AppStore.png"
import { TreeItem } from '@mui/lab';
import { TreeView } from '@mui/lab';
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import PostAddIcon from "@mui/icons-material/PostAdd";
import AddIcon from "@mui/icons-material/Add";
import ImportExportIcon from "@mui/icons-material/ImportExport";
import ListAltIcon from "@mui/icons-material/ListAlt";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleIcon from "@mui/icons-material/People";
import RateReviewIcon from "@mui/icons-material/RateReview";
import { Link } from 'react-router-dom';


const Sidebar = () => {
  return (
    <div className='sidebar'>
       <Link></Link>
    <Link to="/admin/dashboard">
        <p>
            <DashboardIcon /> Dashboard
        </p>
    </Link>

    <Link>
    <TreeView defaultCollapseIcon = {<ExpandMoreIcon />}
    defaultExpandIcon = { <ImportExportIcon />}
    >
        <TreeItem nodeId= "1" label = "Products">
            
            <Link to="/admin/products">
        <TreeItem nodeId= "2" label = "All" icon= {<PostAddIcon />} />
            </Link>

            <Link to="/admin/product">
        <TreeItem nodeId= "3" label = "Create" icon= {<AddIcon />} />
        
                
            </Link>

        </TreeItem>



    </TreeView>
    </Link>

    <Link to="/admin/orders">
        <p>
            <ListAltIcon />
            Orders
        </p>
    </Link>
    <Link to="/admin/users" >
        <p>
            <PeopleIcon /> User
        </p>
    </Link>
    <Link to="/admin/reviews" >
        <p>
            <RateReviewIcon /> Reviews
        </p>
    </Link>



    </div>
  )
}

export default Sidebar