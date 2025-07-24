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
    console.log("Connected!");
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

app.use(route);

if (!constanst.isProd) {
  const morgan = require("morgan");
  app.use(morgan("dev"));

  const https = require("https");
  const fs = require("fs");
  https
    .createServer(
      {
        key: fs.readFileSync("serverdev.com+2-key.pem"),
        cert: fs.readFileSync("serverdev.com+2.pem"),
      },
      app
    )
    .listen(constanst.port, () => console.log(`server listening at port: ${constanst.port}`));
}

module.exports = app;
