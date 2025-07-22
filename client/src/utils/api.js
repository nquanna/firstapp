import axios from "axios";

import constanst from "./constanst";

const httpRequest = axios.create({
  baseURL: constanst.baseUrl,
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});

const request = async ({ path, method, data = {} }) => {
  switch (method) {
    case "get":
      try {
        const response = await httpRequest.get(path);
        return response.data;
      } catch (error) {
        console.log(error);
        return error.response?.data;
      }

    case "post":
      try {
        const response = await httpRequest.post(path, data);
        return response.data;
      } catch (error) {
        console.log(error);
        return error.response?.data;
      }

    case "put":
      break;

    case "patch":
      try {
        const response = await httpRequest.patch(path, data);
        return response.data;
      } catch (error) {
        console.log(error);
        return error.response?.data;
      }

    default:
      console.log("invalid method");
      return null;
  }
};

const api = { request };

export default api;
