const argon2 = require("argon2");
const jwt = require("jsonwebtoken");

const User = require("../models/user");

class AuthController {
  // [POST] /auth
  async loadUser(req, res, next) {
    try {
      if (!req.body.userId)
        return res.status(400).json({ success: false, message: "cannot find user id" });

      const user = await User.findById(req.body.userId).select("-password").exec();
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

  // [POST] /auth/login
  async login(req, res, next) {
    try {
      const user = await User.findOne({ username: req.body.username }).exec();
      const isValidPassword = await argon2.verify(user?.password, req.body.password);

      if (!user || !isValidPassword)
        return res.status(401).json({ success: false, message: "Incorrect username or password" });

      const token = jwt.sign({ userId: user.id }, process.env.SECRET_KEY);

      res.json({
        success: true,
        message: "Login successfully",
        token,
      });
    } catch (error) {
      console.log("Incorrect username or password");
      res.status(500).json({ success: false, message: "Internal Server Error" });
    }
  }

  // [POST] /auth/register
  async register(req, res, next) {
    try {
      const user = await User.findOne({ username: req.body.username }).exec();

      if (user) {
        console.log("user already exists!");
        return res.status(409).json({ success: false, message: "user already exists!" });
      }

      req.body.password = await argon2.hash(req.body.password);

      const newUser = new User(req.body);
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
}

module.exports = new AuthController();
