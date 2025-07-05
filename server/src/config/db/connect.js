const mongoose = require("mongoose");

const connect = () =>
  mongoose
    .connect("mongodb://127.0.0.1:27017/firstapp")
    .then(() => console.log("Connected!"))
    .catch(() => console.log("ERROR!!!"));

module.exports = connect;
