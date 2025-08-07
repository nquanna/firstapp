const express = require("express");

const router = express.Router();

const LearnController = require("../app/controllers/LearnController");

router.get("/send-notification", LearnController.sendNotification);

router.post("/subscribe", LearnController.subscribe);
router.post("/insert-work", LearnController.insertWord);

module.exports = router;
