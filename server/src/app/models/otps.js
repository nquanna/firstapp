const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const constanst = require("../../utils/constanst");

const otps = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    type: {
      type: String,
      required: true,
    },
    otp: {
      type: String,
      required: true,
      unique: true,
    },
    /* 
    expireAt: {
      type: Date,
      default: () => Date.now(),
      expires: constanst.expiresOtpTime,
    } */
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("otps", otps, "otps");
