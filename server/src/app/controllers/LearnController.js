const webpush = require("web-push");

const constanst = require("../../utils/constanst");

const neonQueries = require("../../config/database/neonQueries");

webpush.setVapidDetails("mailto:test@test.com", constanst.vapidPublicKey, constanst.vapidPrivateKey);

class LearnController {
  // [POST] /learn/subscribe
  async subscribe(req, res) {
    try {
      const subscription = req.body;
      const existsDevice = await neonQueries.get.deviceThroughEndpoint(subscription.endpoint);
      // const existsDevice = await neonQueries.getDeviceThroughEndpoint(subscription.endpoint);
      if (existsDevice) {
        console.log("update");
        await neonQueries.update.device({ ...subscription });
      } else {
        console.log("insert");
        await neonQueries.insert.device({ ...subscription });
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

  async sendNotification(req, res) {
    console.log(req.query);

    if (req.query["all-devices"]) {
      const devices = await neonQueries.get.devices();

      if (devices) {
        console.log("send notification to all devices!");

        devices.forEach((device, index) => {
          const subscription = {
            ...device,
            keys: {
              p256dh: device.p256dh,
              auth: device.auth,
            },
          };

          const payload = JSON.stringify({
            title: "🔥 Hello from server!",
            body: `Đây là push notification ${index} đó bro!`,
          });

          console.log("subscription:", subscription);
          webpush.sendNotification(subscription, payload).catch((error) => console.error(error));
        });
      }
    }

    return res.json({ success: true, message: "Getted all devices!" });
  }
}

module.exports = new LearnController();
