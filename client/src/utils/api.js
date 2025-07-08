import axios from "axios";

export const httpRequest = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
});

const request = async ({ path, method, data = {} }) => {
  try {
    switch (method) {
      case "get" || "GET":
        return await httpRequest.get(path);
      case "post" || "POST":
        return await httpRequest.post(path, data);
      default:
        console.log("invalid method");
        return null;
    }
  } catch (error) {
    console.warn(error);
    return null;
  }
};

const setHeaders = (token) => {
  console.log("set headers with: token:", token);
  if (token) return (httpRequest.defaults.headers.common["Authorization"] = `Bearer ${token}`);
  return delete httpRequest.defaults.headers.common["Authorization"];
};

const token = (token) => {
  if (token) localStorage.setItem(process.env.REACT_APP_TOKEN_KEY, JSON.stringify(token));
  else localStorage.removeItem(process.env.REACT_APP_TOKEN_KEY);
};

const api = { request, setHeaders, token };

export default api;
