const argon2 = require("argon2");

const neonQueries = require("../../config/database/neonQueries");

// [POST] /auth/register
// [POST] /auth/forgot-password
const verifyOtp = async (req, res, next) => {
  try {
    const otpInDb = await neonQueries.get.otp(req.body.email);
    req.body.isValidOtp = await argon2.verify(otpInDb.otp, req.body.otp || "");
  } catch (error) {
    console.log("error in otp verify:", error);
    req.body.isValidOtp = false;
  } finally {
    next();
  }
};

module.exports = verifyOtp;
