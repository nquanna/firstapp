const constanst = {
  baseUrl:
    process.env.NODE_ENV === "development"
      ? process.env.REACT_APP_BASE_URL_DEV
      : "https://firstapp-pzi0.onrender.com",
  otpDelay: 10,
};

export default constanst;
