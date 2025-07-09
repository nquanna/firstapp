const mongoose = require("mongoose");

const connect = () =>
  mongoose
    .connect(process.env.MONGO_URL)
    .then(() => console.log("Connected!"))
    .catch(() => console.log("ERROR!!!"));

module.exports = connect;
