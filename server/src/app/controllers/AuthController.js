const argon2 = require("argon2");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const crypto = require("crypto");

const constanst = require("../../utils/constanst");
const genUniqueDeviceId = require("../../utils/genUniqueDeviceId");

const neonQueries = require("../models/neonQueries");

class AuthController {
  // [POST] /auth
  async loadUser(req, res, next) {
    try {
      if (!req.body.subEmail) {
        if (req.body.isFirstly)
          return res.json({
            success: false,
            isFirstly: true,
            message: "cannot find user id because invalid cookies",
          });

        return res.status(401).json({ success: false, message: "cannot find user id" });
      }

      const user = await neonQueries.get.user(req.body.subEmail);
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

      const user = await neonQueries.get.user(req.body.email);
      if (user) {
        console.log("user already exists!");
        return res.status(409).json({ success: false, message: "user already exists!" });
      }

      req.body.pass = req.body.password;
      req.body.password = await argon2.hash(req.body.password);

      await neonQueries.insert.user(req.body);

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
      const user = await neonQueries.get.user(req.body.email);
      if (!user) return res.status(401).json({ success: false, message: "Incorrect email or password" });

      const isValidPassword = await argon2.verify(user.password, req.body.password);
      if (!isValidPassword)
        return res.status(401).json({ success: false, message: "Incorrect email or password" });

      const deviceId = await genUniqueDeviceId();

      const token = jwt.sign({ subId: user.id, subEmail: user.email, deviceId }, constanst.jwtSecret);
      console.log("login successfully!");

      await neonQueries.insert.device({ userId: user.id, deviceId });

      res
        .setHeader(
          "Set-Cookie",
          `token=${token}; Path=/; Max-Age=${
            60 * 60 * 24 * 365 * 10000000
          }; HttpOnly; Secure; SameSite=None; Partitioned`
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
      await neonQueries.insert.otp({ email, otp: await argon2.hash(otp), role: type });

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
      if (!req.body.subEmail)
        return res.status(401).json({ success: false, message: "Cannot find user id!" });
      if (!req.body.deviceId)
        return res.status(401).json({ success: false, message: "Cannot find device id!" });

      await neonQueries.delete.device(req.body.deviceId);
      console.log("logout successfully!");

      res
        .setHeader(
          "Set-Cookie",
          `token=${null}; Path=/; Max-Age=${0}; HttpOnly; Secure; SameSite=None; Partitioned`
        )
        .json({
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
      await neonQueries.update.user({
        email: req.body.email,
        newPass: req.body.password,
        newPassword: hashedPassword,
      });

      console.log("reseted password!");
      return res.json({ success: true, message: "Updated password" });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ success: false, message: "Internal Server Error!!!" });
    }
  }
}

module.exports = new AuthController();
