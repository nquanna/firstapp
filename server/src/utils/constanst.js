const constanst = {
  isProd: process.env.NODE_ENV === "production",
  port: process.env.PORT || 5000,
  mongoUri: process.env.MONGO_URI,
  neonUrl: process.env.NEON_URL,
  vapidPublicKey: process.env.VAPID_PUBLIC_KEY,
  vapidPrivateKey: process.env.VAPID_PRIVATE_KEY,
  jwtSecret: process.env.JWT_SECRET,
  gmailName: `'nquanna' ${process.env.GMAIL_SYSTEM}`,
  gmailSystem: process.env.GMAIL_SYSTEM,
  gmailPassword: process.env.GMAIL_PASSWORD,
  origin: process.env.ORIGIN,
  baseURL: process.env.BASE_URL,
  apiKey: process.env.API_KEY,
  expiresOtpTime: 120,
};

module.exports = constanst;
