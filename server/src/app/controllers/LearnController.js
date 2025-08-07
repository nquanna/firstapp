const webpush = require("web-push");

const constanst = require("../../utils/constanst");

const neonQueries = require("../../config/database/neonQueries");

webpush.setVapidDetails("mailto:test@test.com", constanst.vapidPublicKey, constanst.vapidPrivateKey);

class LearnController {
  // [POST] /learn/subscribe
  async subscribe(req, res) {
    try {
      const subscription = req.body;
      const existsDevice = await neonQueries.getDeviceThroughEndpoint(subscription.endpoint);
      if (existsDevice) {
        await neonQueries.updateDevice({ ...subscription });
      } else {
        console.log("insert");
        await neonQueries.insertDevice({ ...subscription });
      }

      const payload = JSON.stringify({
        title: "🔥 Hello from server!",
        body: "Đây là push notification đầu tiên đó bro!",
      });

      console.log("received!");

      webpush.sendNotification(subscription, payload).catch((error) => console.error(error));

      return res.status(201).json({ success: true, message: "Sent push notification!" });
    } catch (error) {
      console.log("error:", error);
      return res.status(500).json({ success: false, message: "Internal Server Error!" });
    }
  }

  // [POST] /learn/insert-work
  async insertWord(req, res) {
    try {
      return res.status(201).json({ success: true, message: "Inserted new word!" });
    } catch (error) {
      console.log("error:", error);
      return res.status(500).json({ success: false, message: "Internal Server Error!" });
    }
  }
}

module.exports = new LearnController();
