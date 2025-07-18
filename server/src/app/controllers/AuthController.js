const argon2 = require("argon2");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const crypto = require("crypto");

const constanst = require("../../utils/constanst");

const UserSchema = require("../models/user");
const OtpSchema = require("../models/otps");

class AuthController {
  // [POST] /auth
  async loadUser(req, res, next) {
    try {
      if (!req.body.sub) return res.status(401).json({ success: false, message: "cannot find user id" });

      const user = await UserSchema.findById(req.body.sub).select("-password").exec();
      if (!user) return res.status(401).json({ success: false, message: "user not found" });

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
      if (!req.body.isValidOtp)
        return res.status(401).json({ success: false, messgae: "Invalid OTP code." });

      const user = await UserSchema.findOne({ email: req.body.email }).exec();
      if (user) {
        console.log("user already exists!");
        return res.status(409).json({ success: false, message: "user already exists!" });
      }

      req.body.password = await argon2.hash(req.body.password);

      const newUser = new UserSchema(req.body);
      await newUser.save();

      res.status(201).json({
        success: true,
        message: "registered successfully",
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

      const token = jwt.sign({ sub: user.id }, constanst.jwtSecret);
      console.log("login successfully!");

      await UserSchema.updateOne({ email: user.email }, { amount: ++user.amount });

      res
        .setHeader(
          "Set-Cookie",
          `token=${token}; Max-Age=${3600}; HttpOnly; Secure; SameSite=None; Partitioned`
        )
        .json({
          success: true,
          message: "Login successfully",
        });
    } catch (error) {
      console.log(error);
      res.status(500).json({ success: false, message: "Internal Server Error" });
    }
  }

  // [POST] /auth/send-otp
  async sendOtp(req, res, next) {
    const { type, email } = req.body;
    const otp = crypto.randomInt(100000, 999999).toString();
    const html = `<p style="font-size: 16px;"><b>Please do not share this OTP code with anyone.</b><br />
      If you think someone else might have access to it, please reset your password to protect your account.<br />
      Your OTP code is: <i>${otp}</i>.<br/>
      Code will expire in ${constanst.expiresOtpTime / 60} minutes.<br />
      This OTP code is used for <b>${type === "register" ? "registration" : "reset password"}</b>,
      please do not use this code for other purposes.</p>`;

    try {
      await OtpSchema.updateOne(
        { email },
        { email, type, otp: await argon2.hash(otp) },
        { upsert: true }
      );

      const transporter = nodemailer.createTransport({
        service: "Gmail",
        auth: {
          user: constanst.gmailSystem,
          pass: constanst.gmailPassword,
        },
      });

      await transporter.sendMail({
        from: constanst.gmailName,
        to: email,
        subject: "Your otp code to register or reset your password",
        html,
      });

      console.log("otp:", otp);

      res.json({ success: true, message: `Sent OTP code to ${email}` });
    } catch (error) {
      res.status(500).json({ success: false, message: "cannot send otp code" });
    }
  }

  // [POST] /auth/logout
  async logout(req, res, next) {
    try {
      if (!req.body.sub) return res.status(401).json({ success: false, message: "cannot find user id" });

      await UserSchema.updateOne({ _id: req.body.sub }, { $inc: { amount: -1 } });

      console.log("logout successfully!");
      res.clearCookie("token").json({
        success: true,
        message: "Logout successfully!!!",
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({ success: false, message: "Internal Server Error" });
    }
  }

  // [PATCH] /auth/forgot-password
  async forgotPassword(req, res, next) {
    try {
      if (!req.body.isValidOtp)
        return res.status(401).json({ success: false, message: "Invalid OTP code." });

      const hashedPassword = await argon2.hash(req.body.password);

      await UserSchema.updateOne({ email: req.body.email }, { password: hashedPassword });

      console.log("reseted password!");
      return res.json({ success: true, message: "Updated password" });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ success: false, message: "Internal Server Error!!!" });
    }
  }
}

module.exports = new AuthController();
