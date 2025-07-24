const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const users = new Schema(
  {
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    pass: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    avatarUrl: {
      type: String,
      default: null,
    },
    role: {
      type: String,
      default: "customer",
      required: true,
    },
    amount: {
      type: Number,
      default: 0,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("users", users);
