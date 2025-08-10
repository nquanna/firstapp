const jwt = require("jsonwebtoken");

const constanst = require("../../utils/constanst");

const verifyToken = (req, res, next) => {
  req.body = req.body ?? {};
  try {
    const token = req.cookies?.token || "";
    const decoded = jwt.verify(token, constanst.jwtSecret);
    req.body.subId = decoded.subId;
    req.body.subEmail = decoded.subEmail;
  } catch (error) {
    console.log(error.toString());
  } finally {
    next();
  }
};

module.exports = verifyToken;
