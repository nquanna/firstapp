const mongoose = require("mongoose");

const connect = () =>
  mongoose
    .connect(process.env.MONGO_URI)
    .then(() => console.log("Connected!"))
    .catch(() => console.log("ERROR!!!"));

module.exports = connect;
