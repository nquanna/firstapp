const mongoose = require("mongoose");
const argon2 = require("argon2");

const OtpSchema = require("../../app/models/otps");

// [POST] /auth/forgot-password
const verifyOtp = async (req, res, next) => {
  try {
    const data = await OtpSchema.findOne({ email: req.body.email }).exec();
    req.body.invalidOtp = !(await argon2.verify(data.otp, req.body.otp));
    next();
  } catch {
    console.log("error!!");
    req.body.invalidOtp = true;
    next();
  }
};

module.exports = verifyOtp;
