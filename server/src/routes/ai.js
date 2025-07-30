const express = require("express");
const router = express.Router();

const multer = require("multer");
const upload = multer({ storage: multer.memoryStorage() });

const AIController = require("../app/controllers/AIController");

router.post("/call-api", upload.single("audio"), AIController.callApi);

module.exports = router;
