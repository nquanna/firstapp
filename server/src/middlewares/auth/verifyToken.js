const jwt = require("jsonwebtoken");

const constanst = require("../../utils/constanst");

const verifyToken = (req, res, next) => {
  const token = req.cookies?.token || "";

  try {
    const decoded = jwt.verify(token, constanst.jwtSecret);
    req.body.sub = decoded.sub;
  } catch (error) {
    console.log(error);
  } finally {
    next();
  }
};

module.exports = verifyToken;
