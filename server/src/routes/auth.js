const express = require("express");
const router = express.Router();

const AuthController = require("../app/controllers/AuthController");

const validate = require("../middlewares/auth/validate");

router.post("/login", validate, AuthController.login);
router.post("/register", validate, AuthController.register);

module.exports = router;
