const express = require("express");
const cors = require("cors");

require("dotenv").config();
require("./config/db/connect")();

const route = require("./routes/index");

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

app.use(route);

app.listen(process.env.PORT, () =>
  console.log(`server listening at http://localhost:${process.env.PORT}`)
);
