const Product = require("../models/productModel");
const ErrorHandler = require("../util/errorhandler");
const catchAsyncErrors = require("../middleware/catchAsyncError");
const ApiFeatures = require("../util/apifeatures");
const cloudinary = require("cloudinary");
// Create Product -- (Only Admin)

exports.createProduct = catchAsyncErrors(async (req, res, next) => {

  let images = [];

  if(typeof req.body.images === "string"){
    // means only single image to be pushed to array
    images.push(req.body.images);
  }else{
    //more than one image array is there 
    images = req.body.images;

  }

  const imagesLink = [];

  for (let i = 0; i < images.length; i++) {
    
    const result = await cloudinary.v2.uploader.upload(images[i],{
      folder: "products",
    });

    imagesLink.push({
      public_id : result.public_id,
      url:result.secure_url,
    })
    
  }

  req.body.images = imagesLink;

  req.body.user = req.user.id;

  const product = await Product.create(req.body);

  res.status(201).json({
    success: true,
    product,
  });
});

// Get all Products

exports.getAllProduct = catchAsyncErrors(async (req, res, next) => {
  const resultPerPage = 8;

  const productsCount = await Product.countDocuments();

  const apiFeature = new ApiFeatures(Product.find(), req.query)
    .search()
    .pagination(resultPerPage);

  const products = await apiFeature.query;

  res.status(200).json({
    success: true,
    products,
    productsCount,
    resultPerPage,
  });
});

// Get all Products (Admin)

exports.getAdminProducts = catchAsyncErrors(async (req, res, next) => {
  
  const products = await Product.find();

  res.status(200).json({
    success: true,
    products,
   
  });
});

// Get Product Details
exports.getProductDetails = catchAsyncErrors(async (req, res, next) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
  }

  res.status(200).json({
    success: true,
    product,
  });
});

// Update Products --(Admin Only)

exports.updateProduct = catchAsyncErrors(async (req, res, next) => {
  let product = await Product.findById(req.params.id);

  // <-- Before Error Handling class -->
  // if (!product) {
  //   return res.status(500).json({
  //     success: false,
  //     message: "Product Not Found !",
  //   });
  // }

  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
  }

  let images = [];

  if(typeof req.body.images === "string"){
    // means only single image to be pushed to array
    images.push(req.body.images);
  }else{
    //more than one image array is there 
    images = req.body.images;

  }

  if(images !== undefined){

     // Deleteing images from cloundinary
  for (let i = 0; i < product.images.length; i++) {
    await cloudinary.v2.uploader.destroy(product.images[i].public_id)
    
  }

    const imagesLink = [];

  for (let i = 0; i < images.length; i++) {
    
    const result = await cloudinary.v2.uploader.upload(images[i],{
      folder: "products",
    });

    imagesLink.push({
      public_id : result.public_id,
      url:result.secure_url,
    })
    
  }

  req.body.images = imagesLink;
  }

  product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
    product,
  });
});

// Delete A Product

exports.deleteProduct = catchAsyncErrors(async (req, res, next) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
  }

  // Deleteing images from cloundinary
  for (let i = 0; i < product.images.length; i++) {
    await cloudinary.v2.uploader.destroy(product.images[i].public_id)
    
  }

  await product.remove();

  res.status(200).json({
    success: true,
    message: "Product Deleted Successfully",
  });
});

// Create or Update Review

exports.createProductReview = catchAsyncErrors(async (req, res, next) => {
  const { rating, comment, productId } = req.body;
  const review = {
    user: req.user._id,
    name: req.user.name,
    rating: Number(rating),
    comment,
  };

  const product = await Product.findById(productId);

  const isReviewed = product.reviews.find(
    (rev) => rev.user.toString() === req.user._id.toString()
  );

  if (isReviewed) {
    product.reviews.forEach((rev) => {
      if (rev.user.toString() === req.user._id.toString()) {
        (rev.rating = rating), (rev.comment = comment);
      }
    });
  } else {
    product.reviews.push(review);
    product.numOfReviews = product.reviews.length;
  }

  let average = 0;

  product.reviews.forEach((rev) => {
    average += rev.rating;
  });

 

  product.ratings = average / product.reviews.length;

  await product.save({
    validateBeforeSave: false,
  });

  res.status(200).json({
    success: true,
  });
});

// Get all reviews of a Product
exports.getProductReviews = catchAsyncErrors(async (req, res, next) => {
  const product = await Product.findById(req.query.id);

  if (!product) {
    return next(new ErrorHandler("Product not Found ", 404));
  }

  res.status(200).json({
    success: true,
    reviews: product.reviews,
  });
});

// Delete a Review

exports.deleteReview = catchAsyncErrors(async (req, res, next) => {
  const product = await Product.findById(req.query.productId);

  if (!product) {
    return next(new ErrorHandler("Product not Found ", 404));
  }

  const reviews = product.reviews.filter(
    (rev) => rev._id.toString() !== req.query.id.toString()
  );

  let average = 0;

  reviews.forEach((rev) => {
    average += rev.rating;
  });

  let ratings = 0;
  if(reviews.length === 0){
   ratings = 0;
    
  }else{
    
    ratings = average / reviews.length;
  }

  const numOfReviews = reviews.length;

  await Product.findByIdAndUpdate(
    req.query.productId,
    {
      reviews,
      ratings,
      numOfReviews,
    },
    {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    }
  );

  res.status(200).json({
    success: true,
  });
});
