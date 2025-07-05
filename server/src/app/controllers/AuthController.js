const argon2 = require("argon2");
const jwt = require("jsonwebtoken");

const User = require("../models/user");

class AuthController {
  // [POST] /auth/login
  async login(req, res, next) {
    try {
      const token = req.headers["authorization"].split(" ")[1];
      const userId = jwt.verify(token, process.env.SECRET_KEY).userId;

      const user = await User.findOne({ _id: userId }).exec();
      if (!user) {
        console.log("user not exists!");
        return res.status(400).json({ success: false, message: "user not exists!" });
      }

      const isValidPassword = await argon2.verify(user.password, req.body.password);
      if (!isValidPassword || user.username !== req.body.username) {
        console.log("username or password is invalid!");
        return res.status(400).json({ success: false, message: "username or password is invalid!" });
      }

      req.body.userId = userId;
      res.json(req.body);
    } catch {
      console.log("invalid token");
      res.status(400).json({ success: false, message: "invalid token" });
    }
  }

  // [POST] /auth/register
  async register(req, res, next) {
    try {
      const { username } = req.body;
      const user = await User.findOne({ username }).exec();

      if (user) {
        console.log("user already exists!");
        return res.status(400).json({ success: false, message: "user already exists!" });
      }

      req.body.password = await argon2.hash(req.body.password);

      const newUser = new User(req.body);
      await newUser.save();
      const token = jwt.sign({ userId: newUser._id }, process.env.SECRET_KEY);

      req.body.userId = newUser._id;
      req.body.token = token;
      res.json(req.body);
    } catch {
      console.log("ERROR!");
      res.status(500).json({ success: false, message: "server error" });
    }
  }
}

module.exports = new AuthController();
