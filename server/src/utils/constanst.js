const constanst = {
  isProd: process.env.NODE_ENV === "production",
  port: process.env.PORT || 3001,
  mongoUri: process.env.MONGO_URI,
  jwtSecret: process.env.JWT_SECRET,
  gmailName: `'nquanna' ${process.env.GMAIL_SYSTEM}`,
  gmailSystem: process.env.GMAIL_SYSTEM,
  gmailPassword: process.env.GMAIL_PASSWORD,
  expiresOtpTime: 120,
};

module.exports = constanst;
