const express = require("express");
const router = express.Router();

const LearnController = require("../app/controllers/LearnController");

const verifyToken = require("../middlewares/auth/verifyToken");
const verifyDeviceId = require("../middlewares/learn/verifyDeviceId");

router.get("/remind-every-day", LearnController.remindErveryDay);
router.get("/update-words", LearnController.updateWords);
router.get("/send-notification", LearnController.sendNotification);

router.post("/subscribe", verifyDeviceId, LearnController.subscribe);
router.post("/insert-word", verifyToken, LearnController.insertWord);

module.exports = router;
