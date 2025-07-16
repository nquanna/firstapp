const express = require("express");
const router = express.Router();

const AuthController = require("../app/controllers/AuthController");

const validate = require("../middlewares/auth/validate");
const verifyToken = require("../middlewares/auth/verifyToken");
const verifyOtp = require("../middlewares/auth/verifyOtp");

router.post("/login", validate, AuthController.login);
router.post("/register", validate, verifyOtp, AuthController.register);
router.post("/send-otp", AuthController.sendOtp);
router.post("/", verifyToken, AuthController.loadUser);

router.patch("/forgot-password", verifyOtp, validate, AuthController.forgotPassword);

module.exports = router;
