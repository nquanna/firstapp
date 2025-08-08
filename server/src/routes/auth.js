const express = require("express");
const router = express.Router();

const AuthController = require("../app/controllers/AuthController");

const validate = require("../middlewares/auth/validate");
const verifyToken = require("../middlewares/auth/verifyToken");
const verifyOtp = require("../middlewares/auth/verifyOtp");
const verifyDeviceId = require("../middlewares/auth/verifyDeviceId");

router.post("/register", validate, verifyOtp, AuthController.register);
router.post("/login", validate, AuthController.login);
router.post("/send-otp", AuthController.sendOtp);
router.post("/logout", verifyToken, verifyDeviceId, AuthController.logout);
router.post("/", verifyToken, AuthController.loadUser);

router.patch("/forgot-password", validate, verifyOtp, AuthController.forgotPassword);

module.exports = router;
