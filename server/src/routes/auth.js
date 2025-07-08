const express = require("express");
const router = express.Router();

const AuthController = require("../app/controllers/AuthController");

const validate = require("../middlewares/auth/validate");
const verifyToken = require("../middlewares/auth/verifyToken");

router.post("/login", validate, AuthController.login);
router.post("/register", validate, AuthController.register);
router.post("/", verifyToken, AuthController.loadUser);

module.exports = router;
