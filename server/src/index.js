const express = require("express");
const path = require("path");
const cors = require("cors");
const cookieParser = require("cookie-parser");

require("dotenv").config();
require("./config/db/connect")();

const constanst = require("./utils/constanst");

const route = require("./routes/index");

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(
  cors({
    origin: constanst.isProd ? "https://nquanna-firstapp.up.railway.app/" : "http://localhost:3000",
    credentials: true,
  })
);

app.use(cookieParser());

app.use(route);

if (!constanst.isProd) {
  const morgan = require("morgan");
  app.use(morgan("dev"));

  const fs = require("fs");
  const https = require("https");

  return https
    .createServer(
      {
        key: fs.readFileSync("serverdev.com+2-key.pem"),
        cert: fs.readFileSync("serverdev.com+2.pem"),
      },
      app
    )
    .listen(constanst.port, () => console.log(`server listening at http://localhost:${constanst.port}`));
}
/* app.listen(constanst.port, () =>
    console.log(`server listening at http://localhost:${constanst.port}`)
  ); */

module.exports = { app };
