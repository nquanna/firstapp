const express = require("express");
const router = express.Router();

const authRouter = require("./auth");
const aiRouter = require("./ai");
const siteRouter = require("./site");

router.use("/auth", authRouter);
router.use("/ai", aiRouter);
router.use("/", siteRouter);

module.exports = router;
