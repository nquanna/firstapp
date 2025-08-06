const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const webpush = require("web-push");
require("dotenv").config();

const constanst = require("./utils/constanst");
const route = require("./routes/index");
const connectMongo = require("./config/database/connectMongo");
const neonQueries = require("./config/database/neonQueries");

// console.log(neonQueries.createTable());

// const morgan = require("morgan");
const app = express();
// app.use(morgan("dev"));

webpush.setVapidDetails("mailto:test@test.com", constanst.vapidPublicKey, constanst.vapidPrivateKey);

(async () => {
  try {
    await connectMongo();
    console.log("Connected!");
  } catch (err) {
    console.error("DB connect error:", err);
  }
})();

// Middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(
  cors({ origin: constanst.isProd ? constanst.origin : "http://localhost:3000", credentials: true })
);
app.use(cookieParser());

// Subscribe Route
app.post("/subscribe", (req, res) => {
  const subscription = req.body;
  const payload = JSON.stringify({
    title: "🔥 Hello from server!",
    body: "Đây là push notification đầu tiên đó bro!",
  });

  console.log("received!");

  webpush.sendNotification(subscription, payload).catch((err) => console.error(err));

  res.status(201).json({ message: "Sent push notification!" });
});

app.use(route);

if (!constanst.isProd) {
  const https = require("https");
  const fs = require("fs");
  https
    .createServer(
      { key: fs.readFileSync("serverdev.com+2-key.pem"), cert: fs.readFileSync("serverdev.com+2.pem") },
      app
    )
    .listen(constanst.port, () => console.log(`server listening at port: ${constanst.port}`));
}

module.exports = app;
