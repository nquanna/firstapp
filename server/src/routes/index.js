const express = require("express");
const router = express.Router();

const authRouter = require("./auth");
const siteRouter = require("./site");

router.use("/auth", authRouter);
router.use("/", siteRouter);

module.exports = router;
