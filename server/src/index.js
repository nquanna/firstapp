const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
require("dotenv").config();

const constanst = require("./utils/constanst");
const route = require("./routes/index");
const connectDB = require("./config/db/connect");

const app = express();

(async () => {
  try {
    await connectDB();
    console.log("DB connected!");
  } catch (err) {
    console.error("DB connect error:", err);
  }
})();

// Middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(
  cors({
    origin: constanst.isProd ? constanst.origin : "http://localhost:3000",
    credentials: true,
  })
);
app.use(cookieParser());

if (!constanst.isProd) {
  const morgan = require("morgan");
  app.use(morgan("dev"));
}

// Routes
app.use(route);

// **Không gọi app.listen() ở đây**
module.exports = app;
