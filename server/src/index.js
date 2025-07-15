const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

require("dotenv").config();
require("./config/db/connect")();

const constanst = require("./utils/constanst");

const route = require("./routes/index");

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

app.use(route);

app.listen(constanst.port, () => console.log(`server listening at http://localhost:${constanst.port}`));
