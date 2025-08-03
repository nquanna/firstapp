import axios from "axios";

import constanst from "./constanst";

const http = axios.create({
  baseURL: constanst.baseUrl,
  withCredentials: true,
});

const request = async ({ path, method, data = {}, inputType = "json", outputType = "json" }) => {
  switch (method) {
    case "get":
      try {
        const response = await http.get(path);
        return response.data;
      } catch (error) {
        console.log(error);
        return error.response?.data;
      }

    case "post":
      try {
        const response = await http.post(path, data);
        return response.data;
      } catch (error) {
        console.log(error);
        return error.response?.data;
      }

    case "put":
      break;

    case "patch":
      try {
        const response = await http.patch(path, data);
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
