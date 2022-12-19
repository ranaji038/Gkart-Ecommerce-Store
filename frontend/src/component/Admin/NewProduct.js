import React, { Fragment, useEffect, useState } from 'react'
import "./newProduct.css"
import AccountTreeIcon from "@mui/icons-material/AccountTree";
import DescriptionIcon from "@mui/icons-material/Description";
import StorageIcon from "@mui/icons-material/Storage";
import SpellcheckIcon from "@mui/icons-material/Spellcheck";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from 'react-redux';
import { Button } from '@mui/material';
import MetaData from '../layout/MetaData';
import Sidebar from './Sidebar';
import {  useNavigate } from 'react-router-dom';
import { clearErrors, createProduct } from '../../actions/ProductAction';
import { NEW_PRODUCT_RESET } from '../../constants/ProductConstants';


const NewProduct = () => {

    // const { id } = useParams();
const dispatch = useDispatch();
const navigate = useNavigate();

 const { loading , error, success} = useSelector((state) =>state.newProduct);

const [name, setName] = useState("")   ;
const [price, setPrice] = useState(0);
const [description, setDescription] = useState("")
const [category, setCategory] = useState("")
const [stock, setStock] = useState(0)
const [images, setImages] = useState([])
const [imagesPreview, setImagesPreview] = useState([])


const categories = [
    "Laptop",
    "Footwear",
    "Mens Accessories",
    "Attire",
    "Camera",
    "SmartPhones",
    "Smartwatch",
    "LCD/LED Display",
    
]

    useEffect(() => {
      if(error){
        toast.error(error);
        dispatch(clearErrors);
      }

      if(success){
        toast.success("Product Created Successfully!!!");
        navigate("/admin/dashboard");
        dispatch({type : NEW_PRODUCT_RESET})
      }

    }, [dispatch , error , success , navigate])

    const createProductSubmitHandler = (e) =>{
        e.preventDefault();

        const myForm = new FormData();

        myForm.set("name" , name);
        myForm.set("price" , price);
        myForm.set("description" , description);
        myForm.set("category" , category);
        myForm.set("stock" , stock);

        images.forEach((image) =>{
            myForm.append("images" , image);

        })
        dispatch(createProduct(myForm))



    }

    const createProductImagesChange =(e) =>{
        
        //copying array data in files
        const files = Array.from(e.target.files);

        setImages([]);
        setImagesPreview([]);

        files.forEach((file) =>{
            const reader = new FileReader();

            reader.onload = () =>{
                if(reader.readyState === 2){
                    
                    // adding image to the array one by one
                    setImagesPreview((old) => [...old , reader.result])
                    setImages((old) => [...old , reader.result]);

                }
            }

            reader.readAsDataURL(file);
        })

    }


    
  
  return (
    <Fragment>
        <MetaData title="Create Product" />
        <div className="dashboard">
            <Sidebar />
            <div className="newProductContainer">
                <form className='createProductForm' encType='multipart/form-data'
                onSubmit={createProductSubmitHandler}>
            
            <h1>Create Product</h1>

            <div>
                <SpellcheckIcon />
                <input type="text"
                placeholder='Product Name'
                required
                value={name}
                onChange={(e)=> setName(e.target.value)} />
            </div>
            
            <div>
                <AttachMoneyIcon />
                <input type="number"
                placeholder='Price'
                required
                value={price}
                onChange={(e)=> setPrice(e.target.value)} />
            </div>

            <div>
                <DescriptionIcon />
                <textarea 
                placeholder='Product Description'
                cols="30"
                rows="1"
                value={description}
                onChange={(e)=> setDescription(e.target.value)} > </textarea>
            </div>

            <div>
                <AccountTreeIcon />
                <select onChange={(e) => setCategory(e.target.value)} >
                    <option value="">Choose Category</option>
                    {categories.map((cate , index) => (
                        <option key={index} value={cate} >
                            {cate}
                        </option>
                    ))}
                </select>
            </div>

            <div>
                <StorageIcon />
                <input type="number"
                placeholder='Stock'
                required
                onChange={(e) => setStock(e.target.value)}
                />
            </div>

            <div id="creeateProductFormFile">
                <input type="file"
                name='avatar'
                accept='image/*' 
                multiple
                onChange={createProductImagesChange}
                />
            </div>

            <div id="createProductFormImage">
                {imagesPreview.map((image,index) =>(
                    <img key={index} src={image} alt="Product Preview" />
                ))}
            </div>

            <Button id='createProductBtn'
            type="submit" disabled = {loading ? true : false}
            >
                Create
            </Button>

                </form>
            </div>
        </div>
    </Fragment>
  )
}

export default NewProduct