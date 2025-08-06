const express = require("express");
const router = express.Router();

const authRouter = require("./auth");
const aiRouter = require("./ai");
const learnRouter = require("./learn");
const siteRouter = require("./site");

router.use("/auth", authRouter);
router.use("/ai", aiRouter);
router.use("/learn", learnRouter);
router.use("/", siteRouter);

module.exports = router;
