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
    origin: constanst.isProd ? "https://nquannafirstapp.netlify.app" : "http://localhost:3000",
    credentials: true,
  })
);

console.log(constanst.isProd);
app.use(cookieParser());

// 1. API routes
app.use("/api", route);

// 2. Serve react build
app.use(express.static(path.join(__dirname, "../../client/build")));

// 3. Fallback các route còn lại về index.html
app.get(/(.*)/, (req, res) => {
  res.sendFile(path.join(__dirname, "../../client/build", "index.html"));
});

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
    .listen(constanst.port, () => console.log(`server listening at http://localhost:${constanst.port}`));
} else
  app.listen(constanst.port, () =>
    console.log(`server listening at http://localhost:${constanst.port}`)
  );
