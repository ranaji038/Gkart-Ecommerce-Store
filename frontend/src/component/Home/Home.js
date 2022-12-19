import React, { useEffect } from "react";
import Carousel from "react-bootstrap/Carousel";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Home.css";
import Heading from "../layout/Heading/Heading.js";
import ProductCard from "./ProductCard.js";
import MetaData from "../layout/MetaData";
import { clearErrors, getProduct } from "../../actions/ProductAction";
import { useSelector, useDispatch } from "react-redux";
import Loader from "../layout/Loader/Loader";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Home = ({ start }) => {
  const dispatch = useDispatch();

  const { loading, error, products } = useSelector((state) => state.products);

  useEffect(() => {
    window.scrollTo(0, 0);

    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }

    dispatch(getProduct());
  }, [dispatch, error]);

  
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <MetaData title="Gkart.com" />
         
          <Carousel fade>
{start.map((item, index) => (
  <Carousel.Item key={index} interval={3000}>
    <Link to={item.imageurl}>
    <img
      className="d-block w-10 carouselstyling"
      // src={item.imagelink}
      src={item.imagelink}
      key={index}
      alt="First slide"
    />
    </Link>
  </Carousel.Item>
))}
</Carousel>


          <Heading text="Featured Products" />

          <div className="container" id="container">
            {products &&
              products.map((product, index) => (
                <ProductCard key={index} product={product} />
              ))}
          </div>
          <div className="btn-div">
            <Link to="/products">
              <button className="showmorebtn">Show More...</button>
            </Link>
          </div>
        </>
      )}
    </>
  );
};

export default Home;
