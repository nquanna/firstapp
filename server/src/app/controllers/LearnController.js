const webpush = require("web-push");

const constanst = require("../../utils/constanst");

webpush.setVapidDetails("mailto:test@test.com", constanst.vapidPublicKey, constanst.vapidPrivateKey);

class LearnController {
  // [POST] /learn/subscribe
  subscribe(req, res) {
    const subscription = req.body;
    const payload = JSON.stringify({
      title: "🔥 Hello from server!",
      body: "Đây là push notification đầu tiên đó bro!",
    });

    console.log("received!");

    webpush.sendNotification(subscription, payload).catch((error) => console.error(error));

    res.status(201).json({ message: "Sent push notification!" });
  }
}

module.exports = new LearnController();
