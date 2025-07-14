const express = require("express");
const router = express.Router();

const AuthController = require("../app/controllers/AuthController");

const validate = require("../middlewares/auth/validate");
const verifyToken = require("../middlewares/auth/verifyToken");
const verifyOtp = require("../middlewares/auth/verifyOtp");

router.post("/login", validate, AuthController.login);
router.post("/register", validate, AuthController.register);
router.post("/send-otp", AuthController.sendOtp);
router.post("/forgot-password", verifyOtp, AuthController.forgotPassword);
router.post("/", verifyToken, AuthController.loadUser);

module.exports = router;
