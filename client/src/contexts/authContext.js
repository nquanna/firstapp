import { createContext, useEffect, useReducer, useRef } from "react";

import { userReducer } from "~/reducers";
import api from "~/utils/api";

const AuthContext = createContext();
const AuthContextProvider = ({ children }) => {
  const [user, dispatch] = useReducer(userReducer, {
    isAuthenticated: false,
    user: null,
  });

  const TOKEN_KEY = useRef(process.env.REACT_APP_TOKEN_KEY).current;

  const loadUser = async (userToken) => {
    const token = userToken || (localStorage[TOKEN_KEY] && JSON.parse(localStorage[TOKEN_KEY]));
    if (token) api.headers(token);
    else return;

    const response = await api.request({
      path: "/auth",
      method: "post",
    });

    // console.log("response:", response);
    if (response.success) {
      dispatch({
        isAuthenticated: true,
        user: response.user,
      });
    }
  };

  const loginUser = async (userData) => {
    const response = await api.request({
      path: "/auth/login",
      method: "post",
      data: userData,
    });

    if (!response.success) return;
    api.token(response.token);
    await loadUser(response.token);
  };

  const registerUser = async (userData) => {
    const response = await api.request({
      path: "/auth/register",
      method: "post",
      data: userData,
    });

    if (!response.success) return;
    api.token(response.token);
    await loadUser(response.token);
  };

  const logoutUser = async (userData) => {
    api.token();
    dispatch({
      isAuthenticated: false,
      user: null,
    });

    api.headers();
  };

  useEffect(() => {
    loadUser();
    // eslint-disable-next-line
  }, []);

  const authContextData = { loadUser, loginUser, registerUser, logoutUser, user };
  return <AuthContext.Provider value={authContextData}>{children}</AuthContext.Provider>;
};

export { AuthContext };
export default AuthContextProvider;
