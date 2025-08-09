const jwt = require("jsonwebtoken");

const constanst = require("../../utils/constanst");

const verifyDeviceId = (req, res, next) => {
  try {
    const token = req.cookies?.token || "";
    const decoded = jwt.verify(token, constanst.jwtSecret);

    if (decoded.deviceId) {
      req.body.userId = decoded.subId;
      req.body.deviceId = decoded.deviceId;
    } else throw new Error("invalid device id!");
  } catch (error) {
    console.log(error);
  } finally {
    next();
  }
};

module.exports = verifyDeviceId;
