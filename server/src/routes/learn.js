const express = require("express");
const router = express.Router();

const LearnController = require("../app/controllers/LearnController");

const verifyDeviceId = require("../middlewares/auth/verifyDeviceId");

router.get("/send-notification", LearnController.sendNotification);

router.post("/subscribe", verifyDeviceId, LearnController.subscribe);
router.post("/insert-work", LearnController.insertWord);

module.exports = router;
