const constanst = {
  baseUrl: process.env.NODE_ENV === "development" ? process.env.REACT_APP_BASE_URL : "url",
  tokenKey: process.env.REACT_APP_TOKEN_KEY,
};

export default constanst;
