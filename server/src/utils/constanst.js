const constanst = {
  port: process.env.PORT || 3001,
  mongoUri: process.env.MONGO_URI,
  jwtSecret: process.env.JWT_SECRET,
  gmailSystem: '"Hoang Quan" <hmquan917@gmail.com>',
  gmailPassword: process.env.GMAIL_PASSWORD,
};

module.exports = constanst;
