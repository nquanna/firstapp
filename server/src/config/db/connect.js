const mongoose = require("mongoose");

const constanst = require("../../utils/constanst");

const connect = () =>
  mongoose
    .connect(constanst.mongoUri)
    .then(() => console.log("Connected!"))
    .catch(() => console.log("ERROR!!!"));

module.exports = connect;
