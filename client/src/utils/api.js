import axios from "axios";

const httpRequest = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
});

const request = async ({ path, method, data = {} }) => {
  switch (method) {
    case "GET":
    case "get":
      try {
        const response = await httpRequest.get(path);
        return response.data;
      } catch (error) {
        console.log(error);
        return error.response.data;
      }

    case "POST":
    case "post":
      try {
        const response = await httpRequest.post(path, data);
        return response.data;
      } catch (error) {
        console.log(error);
        return error.response.data;
      }

    default:
      console.log("invalid method");
      return null;
  }
};

const headers = (token) => {
  // console.log("set headers with: token:", token);
  if (token) return (httpRequest.defaults.headers.common["Authorization"] = `Bearer ${token}`);
  return delete httpRequest.defaults.headers.common["Authorization"];
};

const token = (token) => {
  if (token) localStorage.setItem(process.env.REACT_APP_TOKEN_KEY, JSON.stringify(token));
  else localStorage.removeItem(process.env.REACT_APP_TOKEN_KEY);
};

const api = { request, headers, token };

export default api;
