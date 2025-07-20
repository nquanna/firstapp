const constanst = {
  baseUrl:
    process.env.NODE_ENV === "development"
      ? process.env.REACT_APP_BASE_URL_DEV
      : process.env.REACT_APP_BASE_URL_PROD,
  otpDelay: 10,
};

export default constanst;
