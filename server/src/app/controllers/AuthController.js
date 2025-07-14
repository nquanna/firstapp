const argon2 = require("argon2");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const crypto = require("crypto");

const UserSchema = require("../models/user");
const OtpSchema = require("../models/otps");

class AuthController {
  // [POST] /auth
  async loadUser(req, res, next) {
    try {
      if (!req.body.userId)
        return res.status(400).json({ success: false, message: "cannot find user id" });

      const user = await UserSchema.findById(req.body.userId).select("-password").exec();
      if (!user) return res.status(400).json({ success: false, message: "user not found" });

      return res.json({
        success: true,
        message: "found user",
        user,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ success: false, message: "Internal server error" });
    }
  }

  // [POST] /auth/register
  async register(req, res, next) {
    try {
      const user = await UserSchema.findOne({ email: req.body.email }).exec();

      if (user) {
        console.log("user already exists!");
        return res.status(409).json({ success: false, message: "user already exists!" });
      }

      req.body.password = await argon2.hash(req.body.password);

      const newUser = new UserSchema(req.body);
      await newUser.save();
      const token = jwt.sign({ userId: newUser._id }, process.env.SECRET_KEY);

      res.status(201).json({
        success: true,
        message: "registered successfully",
        token,
      });
    } catch {
      console.log("ERROR!");
      res.status(500).json({ success: false, message: "server error" });
    }
  }

  // [POST] /auth/login
  async login(req, res, next) {
    try {
      const user = await UserSchema.findOne({ email: req.body.email }).exec();

      if (!user) return res.status(401).json({ success: false, message: "Incorrect email or password" });

      const isValidPassword = await argon2.verify(user?.password, req.body.password);
      if (!isValidPassword)
        return res.status(401).json({ success: false, message: "Incorrect email or password" });

      const token = jwt.sign({ userId: user.id }, process.env.SECRET_KEY);

      res.json({
        success: true,
        message: "Login successfully",
        token,
      });
    } catch (error) {
      console.log("Incorrect email or password");
      res.status(500).json({ success: false, message: "Internal Server Error" });
    }
  }

  // [POST] /auth/send-otp
  async sendOtp(req, res, next) {
    const otp = crypto.randomInt(100000, 999999).toString();
    const html = `<p style="font-size: 56px;"><b>Please do not share this OTP code with anyone.</b><br />
      If you think someone else might have access to it, please reset your password to protect your account.<br />
      Your OTP code is: <i>${otp}</i>.<br/>
      Code will expire in 2 minute</p>`;

    const { email } = req.body;

    try {
      const hashedOtp = await argon2.hash(otp);
      const saveOtp = new OtpSchema({ email, otp: hashedOtp });
      await saveOtp.save();

      const transporter = nodemailer.createTransport({
        service: "Gmail",
        auth: {
          user: "hmquan917@gmail.com",
          pass: process.env.GMAIL_PASSWORD,
        },
      });

      await transporter.sendMail({
        from: '"Hoang Quan" <hmquan917@gmail.com>',
        to: email,
        subject: "Your otp code to register or reset your password",
        html,
      });

      console.log(otp);

      res.json({ success: true, message: "Sent OTP code" });
    } catch (error) {
      res.status(500).json({ success: false, message: "cannot send otp code" });
    }
  }

  // [POST] /auth/forgot-password
  async forgotPassword(req, res, next) {
    try {
      if (req.body.invalidOtp)
        return res.status(401).json({ success: false, message: "Invalid OTP code." });

      console.log("valid otp");
      return res.json({ success: true, message: "Valid OTP!!!" });
    } catch (error) {
      return res.status(401).json({ success: false, message: "Invalid OTP code in error" });
    }
  }
}

module.exports = new AuthController();
