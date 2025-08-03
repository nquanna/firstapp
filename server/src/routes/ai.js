const express = require("express");
const router = express.Router();

const multer = require("multer");
const upload = multer({ storage: multer.memoryStorage() });

const AIController = require("../app/controllers/AIController");

router.get("/remove-cache", AIController.removeCache);

router.post("/call-model", upload.single("audio"), AIController.callModel);

module.exports = router;
