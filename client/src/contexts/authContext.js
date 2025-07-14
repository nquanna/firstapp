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

  const loginUser = async (authData) => {
    const response = await api.request({
      path: "/auth/login",
      method: "post",
      data: authData,
    });

    if (!response.success) return;
    api.token(response.token);
    await loadUser(response.token);
  };

  const registerUser = async (authData) => {
    const response = await api.request({
      path: "/auth/register",
      method: "post",
      data: authData,
    });

    if (!response.success) return;
    api.token(response.token);
    await loadUser(response.token);

    return response;
  };

  const logoutUser = async () => {
    api.token();
    dispatch({
      isAuthenticated: false,
      user: null,
    });

    api.headers();
  };

  const sendOtp = async (authData) => {
    console.log(authData.email);
    try {
      await api.request({
        path: "/auth/send-otp",
        method: "post",
        data: authData,
      });
    } catch (error) {
      console.log("cannot send otp, why???");
    }
  };

  const forgotPassword = async (authData) => {
    try {
      await api.request({
        path: "/auth/forgot-password",
        method: "post",
        data: authData,
      });
    } catch (error) {
      console.log("what the hell");
    }
  };

  useEffect(() => {
    loadUser();
    // eslint-disable-next-line
  }, []);

  const authContextData = {
    loadUser,
    loginUser,
    registerUser,
    logoutUser,
    sendOtp,
    forgotPassword,
    user,
  };
  return <AuthContext.Provider value={authContextData}>{children}</AuthContext.Provider>;
};

export { AuthContext };
export default AuthContextProvider;
