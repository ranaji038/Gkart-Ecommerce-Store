const { JsonWebTokenError } = require("jsonwebtoken");
const ErrorHandler = require("../util/errorhandler");

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.message = err.message || "Internal Server Error";

  // Wrong Mongodb ID error handling
  if (err.name === "CastError") {
    const message = `Resource not Found , Invalid : ${err.path}`;
    err = new ErrorHandler(message, 400);
  }

  // Mongoose duplicate Key error
  if (err.code === 11000) {
    const message = `Duplicate ${Object.keys(err.keyValue)} Entered !!!`;
    err = new ErrorHandler(message, 400);
  }

  // Wrong Jwt error
  if (err.name === "JsonWebTokenError") {
    const message = "Json web token is invalid try again later ";
    err = new ErrorHandler(message, 400);
  }

  // JWT expire error
  if (err.name === "TokenExpireError") {
    const message = "Json web token is Expired , try again later ";
    err = new ErrorHandler(message, 400);
  }

  res.status(err.statusCode).json({
    success: false,
    error: err.message,
  });
};
