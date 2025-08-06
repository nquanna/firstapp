const express = require("express");

const router = express.Router();

const LearnController = require("../app/controllers/LearnController");

router.post("/subscribe", LearnController.subscribe);

module.exports = router;
