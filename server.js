const app = require("./app");
const cloudinary = require("cloudinary");
const connectDatabase = require("./Backend/config/database");

// Handling Uncaught Errors
process.on("uncaughtException", (err) => {
  console.log(`Error : ${err.message}`);
  console.log("Shutting down the server due to uncaughtException");
  process.exit(1);
});

//config
if (process.env.NODE_ENV !== "PRODUCTION") {
  require("dotenv").config({ path: "Backend/config/config.env" });
}
// Connecting to database
connectDatabase();
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

const server = app.listen(process.env.PORT, () => {
  console.log(`Server is Running on http://localhost:${process.env.PORT}`);
});

// Unhandled Promise Rejection
process.on("unhandledRejection", (err) => {
  console.log(`Error : ${err.message}`);
  console.log("Shutting down the server due to unhandle Promise Rejection");

  server.close(() => {
    process.exit(1);
  });
});
