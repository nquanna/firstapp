import axios from "axios";

import constanst from "./constanst";

const httpRequest = axios.create({
  baseURL: constanst.baseUrl,
});

const request = async ({ path, method, data = {} }) => {
  switch (method) {
    case "get":
      try {
        const response = await httpRequest.get(path);
        return response.data;
      } catch (error) {
        console.log(error);
        return error.response.data;
      }

    case "post":
      try {
        const response = await httpRequest.post(path, data);
        return response.data;
      } catch (error) {
        console.log(error);
        return error.response.data;
      }

    case "put":
      break;

    case "patch":
      try {
        const response = await httpRequest.patch(path, data);
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
  if (token) localStorage.setItem(constanst.tokenKey, JSON.stringify(token));
  else localStorage.removeItem(constanst.tokenKey);
};

const api = { request, headers, token };

export default api;
