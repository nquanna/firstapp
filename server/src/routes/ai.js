const express = require("express");
const router = express.Router();

const AIController = require("../app/controllers/AIController");

router.post("/prompt", AIController.callApi);

module.exports = router;
