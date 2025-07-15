const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const otps = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    otp: {
      type: String,
      required: true,
      unique: true,
    },
    /* expireAt: {
      type: Date,
      default: () => Date.now(),
      expires: 120,
    }, */
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("otps", otps, "otps");
