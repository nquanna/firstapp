const express = require("express");
const app = express();

require("dotenv").config();

const connect = require("./config/db/connect");

const route = require("./routes/index");

connect();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(route);

app.listen(process.env.PORT, () => console.log(`server listening at http://localhost:${process.env.PORT}`));
