const express = require("express");
const router = express.Router();

const AuthController = require("../app/controllers/AuthController");

const validate = require("../middlewares/auth/validate");
const verifyToken = require("../middlewares/auth/verifyToken");
const verifyOtp = require("../middlewares/auth/verifyOtp");

router.post("/register", validate, verifyOtp, AuthController.register);
router.post("/login", validate, AuthController.login);
router.post("/send-otp", AuthController.sendOtp);
router.post("/logout", verifyToken, AuthController.logout);
router.post("/", verifyToken, AuthController.loadUser);

router.patch("/forgot-password", verifyOtp, validate, AuthController.forgotPassword);

module.exports = router;
