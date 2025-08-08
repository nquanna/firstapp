const webpush = require("web-push");

const constanst = require("../../utils/constanst");
const neonQueries = require("../models/neonQueries");

webpush.setVapidDetails("mailto:test@test.com", constanst.vapidPublicKey, constanst.vapidPrivateKey);

class LearnController {
  // [GET] /learn/send-notification
  async sendNotification(req, res) {
    // console.log(req.query);

    try {
      if (req.query["all-devices"]) {
        const devices = await neonQueries.get.devices();
        // console.log("devices:", devices);

        if (devices) {
          devices.forEach((device, index) => {
            const subscription = {
              ...device,
              keys: {
                p256dh: device.p256dh,
                auth: device.auth,
              },
            };

            const payload = JSON.stringify({
              title: "Hello from server!",
              body: `Send notification for all devices, you are the ${index + 1} person`,
            });

            // console.log("subscription:", subscription);
            webpush
              .sendNotification(subscription, payload)
              .catch((error) => console.error("error:", error));
          });

          console.log("Sent notification to all devices!");
          return res.json({ success: true, message: "Sent notification for all devices!" });
        }
      }
      return res.json({ success: true, message: "Not send notification for all devices!" });
    } catch (error) {
      console.log("error:", error);
      return res.status(500).json({ success: false, message: "Internal Server Error!" });
    }
  }

  // [POST] /learn/subscribe
  async subscribe(req, res) {
    try {
      const subscription = { ...req.body };
      const deviceInDb = await neonQueries.get.deviceId(subscription.deviceId);
      if (deviceInDb) {
        console.log("UPDATED!");
        await neonQueries.update.device({ ...subscription });
      } else {
        console.log("INSERTED!");
        await neonQueries.insert.device({ ...subscription });
      }

      const payload = JSON.stringify({
        title: "Hello from server!",
        body: "You subscribed!",
      });

      console.log("subscribed!");

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
