const webpush = require("web-push");

const constanst = require("../../utils/constanst");
const neonQueries = require("../models/neonQueries");

webpush.setVapidDetails("mailto:test@test.com", constanst.vapidPublicKey, constanst.vapidPrivateKey);

class LearnController {
  // [GET] /learn/remind-every-day
  async remindErveryDay(req, res) {
    try {
      const allUsers = await neonQueries.get.allUsers();

      const allUsersId = allUsers.reduce((finalArray, user) => {
        finalArray.push(user.id);
        return finalArray;
      }, []);

      const deviecsToRemind = await neonQueries.get.deviecsToRemind(allUsersId);
      const wordsToRemind = await neonQueries.get.wordsToRemind(allUsersId);

      if (deviecsToRemind && wordsToRemind) {
        deviecsToRemind.forEach((device) => {
          const subscription = {
            ...device,
            keys: {
              p256dh: device.p256dh,
              auth: device.auth,
            },
          };

          const wordsForThisUser = wordsToRemind.filter((word) => word.user_id === device.user_id);

          wordsForThisUser?.forEach((wordForThisUser) => {
            const {
              word,
              parts_of_speech: parts,
              en_mean: enMean,
              vi_mean: viMean,
              pronounce,
            } = wordForThisUser;

            const payload = JSON.stringify({
              title: "Review your vocab pleasee!",
              body: `word: ${word}, type: ${parts}, English: ${enMean}, Vietnamese: ${viMean}, pronounce:${pronounce}`,
            });

            webpush
              .sendNotification(subscription, payload)
              .catch((error) => console.error("error:", error));
          });
        });
      }

      return res.json({ success: true, message: "Sent words for all devices!" });
    } catch (error) {
      console.log("error:", error);
    }
  }

  // [GET] /learn/remind-every-day
  async remindAllWords(req, res) {
    try {
      const device = await neonQueries.get.deviceUserId(req.body.subId);
      const allWords = await neonQueries.get.allWords();

      allWords?.map((currentWord) => {
        const {
          word,
          parts_of_speech: parts,
          en_mean: enMean,
          vi_mean: viMean,
          pronounce,
        } = currentWord;

        const subscription = {
          ...device,
          keys: {
            p256dh: device.p256dh,
            auth: device.auth,
          },
        };

        const payload = JSON.stringify({
          title: "Review your vocab pleasee!",
          body: `word: ${word}, type: ${parts}, English: ${enMean}, Vietnamese: ${viMean}, pronounce:${pronounce}`,
        });

        webpush.sendNotification(subscription, payload).catch((error) => console.error("error:", error));
      });

      return res.json({ success: true, message: "This is all vocabularies!", allWords });
    } catch (error) {
      console.log("error:", error);
      return res.status(500).json({ success: false, message: "Internal Server Error!" });
    }
  }

  // [GET] /learn/update-words
  async updateWords(req, res) {
    try {
      const wordsToUpdate = await neonQueries.get.wordsToUpdate();
      wordsToUpdate?.forEach(async (wordToUpdate) => {
        const { id, remind_count: remindCount } = wordToUpdate;
        await neonQueries.update.word({ id, remindCount });
      });
      return res.json({ success: true, message: "Updated" });
    } catch (error) {
      console.log("error:", error);
      return res.status(500).json({ success: false, message: "Internal Server Error!" });
    }
  }

  // [GET] /learn/user-today-words
  async userTodayWords(req, res) {
    try {
      const userTodayWords = await neonQueries.get.userTodayWords(req.body.subId);
      return res.json({ success: true, message: "Your today vocabularies!", userTodayWords });
    } catch (error) {
      console.log("error:", error);
      return res.status(500).json({ success: false, message: "Internal Server Error!" });
    }
  }

  // [GET] /learn/all-words
  async allWords(req, res) {
    try {
      const allWords = await neonQueries.get.allWords();
      return res.json({ success: true, message: "This is all vocabularies!", allWords });
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
      neonQueries.insert.word({ ...req.body, userId: req.body.subId });
      return res.status(201).json({ success: true, message: "Inserted new word!" });
    } catch (error) {
      console.log("error:", error);
      return res.status(500).json({ success: false, message: "Internal Server Error!" });
    }
  }
}

module.exports = new LearnController();
