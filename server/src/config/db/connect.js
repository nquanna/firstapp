const mongoose = require("mongoose");
const constanst = require("../../utils/constanst");

let cached = global._mongo;
if (!cached) {
  cached = global._mongo = { conn: null, promise: null };
}

async function connectDB() {
  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    cached.promise = await mongoose
      .connect(constanst.mongoUri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        // maxPoolSize: 10,
        bufferCommands: false,
        connectTimeoutMS: 10000,
      })
      .then((m) => m.connection);
  }
  cached.conn = await cached.promise;
  console.log("Connected!");
  return cached.conn;
}

module.exports = connectDB;

/* const connect = () =>
  mongoose
    .connect(constanst.mongoUri)
    .then(() => console.log("Connected!"))
    .catch(() => console.log("ERROR!!!")); */
