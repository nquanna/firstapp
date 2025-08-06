const constanst = {
  baseUrl:
    process.env.REACT_APP_NODE_ENV === "development"
      ? process.env.REACT_APP_BASE_URL_DEV
      : process.env.REACT_APP_BASE_URL_PROD,
  vapidPublicKey: process.env.REACT_APP_VAPID_PUBLIC_KEY,
  otpDelay: 10,
};

export default constanst;
