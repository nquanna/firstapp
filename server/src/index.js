const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const constanst = require("./utils/constanst");
const route = require("./routes/index");

const app = express();

require("dotenv").config();

const startServer = async () => {
  await require("./config/db/connect")();

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

    const fs = require("fs");
    const https = require("https");

    https
      .createServer(
        {
          key: fs.readFileSync("serverdev.com+2-key.pem"),
          cert: fs.readFileSync("serverdev.com+2.pem"),
        },
        app
      )
      .listen(constanst.port, () =>
        console.log(`server listening at https://localhost:${constanst.port}`)
      );
  } /* else {
    app.listen(constanst.port, () =>
      console.log(`server listening at http://localhost:${constanst.port}`)
    );
  } */
};

startServer();
module.exports = app;
