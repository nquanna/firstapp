const mongoose = require("mongoose");
const constanst = require("../../utils/constanst");

let cached = global._mongo;
if (!cached) {
  cached = global._mongo = { conn: null, promise: null };
}

async function connectMongo() {
  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    cached.promise = await mongoose
      .connect(constanst.mongoUri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        maxPoolSize: 8,
        // bufferCommands: false,
        connectTimeoutMS: 10000,
      })
      .then((m) => m.connection);
  }
  cached.conn = await cached.promise;
  return cached.conn;
}

module.exports = connectMongo;
