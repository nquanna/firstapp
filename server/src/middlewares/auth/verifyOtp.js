const argon2 = require("argon2");

const OtpSchema = require("../../app/models/otps");

// [POST] /auth/register
// [POST] /auth/forgot-password
const verifyOtp = async (req, res, next) => {
  try {
    const otpDoc = await OtpSchema.findOne({ email: req.body.email, type: req.body.type }).exec();
    req.body.isValidOtp = await argon2.verify(otpDoc.otp, req.body.otp || "");
  } catch {
    console.log("error in otp verify");
    req.body.isValidOtp = false;
  } finally {
    next();
  }
};

module.exports = verifyOtp;
