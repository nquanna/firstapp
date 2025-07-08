const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    req.body.userId = decoded.userId;
    next();
  } catch (error) {
    console.log(error);
    next();
  }
};

module.exports = verifyToken;
