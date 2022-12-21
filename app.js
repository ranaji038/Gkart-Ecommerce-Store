const express = require("express");
const app = express();
const errorMiddleware = require("./Backend/middleware/error");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");
const cors = require("cors");
const path = require("path")

app.use(express.json({ limit: '50mb' }));
app.use(cookieParser());
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use(fileUpload({ limit: '50mb' }));
app.use(cors());


//config
if (process.env.NODE_ENV !== "PRODUCTION") {
  require("dotenv").config({ path: "Backend/config/config.env" });
}
// Route Imports
const product = require("./Backend/routes/productRoute");
const user = require("./Backend/routes/userRoute");
const order = require("./Backend/routes/orderRoute");
const payment = require("./Backend/routes/paymentRoute");

app.use("/api/v1", product);
app.use("/api/v1", user);
app.use("/api/v1", order);
app.use("/api/v1", payment);


app.use(express.static(path.join(__dirname, "../frontend/build")));

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../frontend/build/index.html"));
});

//Middleware for Errors
app.use(errorMiddleware);

module.exports = app;
