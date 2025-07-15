const jwt = require("jsonwebtoken");

const constanst = require("../../utils/constanst");

const verifyToken = (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];

  try {
    const decoded = jwt.verify(token, constanst.jwtSecret);
    req.body.userId = decoded.userId;
    next();
  } catch (error) {
    console.log(error);
    next();
  }
};

module.exports = verifyToken;
