import { createContext, useEffect, useReducer } from "react";

import { userReducer } from "~/reducers";
import api, { httpRequest } from "~/utils/api";

const AuthContext = createContext();
const AuthContextProvider = ({ children }) => {
  const [auth, dispatch] = useReducer(userReducer, {
    isAuthenticated: false,
    authLoading: true,
    user: null,
  });

  const loadUser = async (userData) => {
    if (userData && userData.token) {
      api.token(userData.token);
    }

    if (localStorage[process.env.REACT_APP_TOKEN_KEY]) {
      const token = JSON.parse(localStorage[process.env.REACT_APP_TOKEN_KEY]);
      console.log("token:", token);

      api.setHeaders(token);

      const response = await api.request({
        path: "/auth",
        method: "post",
      });

      console.log("response:", response);

      /* dispatch({
        type: "SET_AUTH",
      }); */
    }
  };

  const loginUser = async (userData) => {};

  const registerUser = async (userData) => {
    const user = await api.request({
      path: "/auth/register",
      method: "post",
      data: userData,
    });

    loadUser(user?.data);

    return user?.data;
  };

  useEffect(() => {
    loadUser();
  }, []);

  const authContextData = { loadUser, loginUser, registerUser };
  return <AuthContext.Provider value={authContextData}>{children}</AuthContext.Provider>;
};

export { AuthContext };
export default AuthContextProvider;
