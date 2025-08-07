import { createContext, useEffect, useReducer } from "react";

import { userReducer } from "~/reducers";
import { api } from "~/utils";

const AuthContext = createContext();
const AuthContextProvider = ({ children }) => {
  const [user, dispatch] = useReducer(userReducer, {
    isAuthenticated: false,
    user: null,
  });

  const loadUser = async (isFirstly = false) => {
    const response = await api.request({
      path: "/auth",
      method: "post",
      data: isFirstly ? { isFirstly } : {},
    });

    if (response.success) {
      dispatch({
        isAuthenticated: true,
        user: response.user,
      });
    }

    return response;
  };

  const loginUser = async (authData) => {
    try {
      const response = await api.request({
        path: "/auth/login",
        method: "post",
        data: authData,
      });

      if (response?.success) await loadUser();

      return response;
    } catch (error) {
      console.log(error);
    }
  };

  const registerUser = async (authData) => {
    try {
      const response = await api.request({
        path: "/auth/register",
        method: "post",
        data: authData,
      });

      return response;
    } catch (error) {
      console.log(error);
    }
  };

  const logoutUser = async () => {
    try {
      const response = await api.request({
        path: "/auth/logout",
        method: "post",
      });

      if (response.success)
        dispatch({
          isAuthenticated: false,
          user: null,
        });

      return response;
    } catch (error) {
      console.log(error);
    }
  };

  const sendOtp = async (authData) => {
    try {
      const response = await api.request({
        path: "/auth/send-otp",
        method: "post",
        data: authData,
      });
      return response;
    } catch (error) {
      console.log(error);
    }
  };

  const forgotPassword = async (authData) => {
    try {
      const response = await api.request({
        path: "/auth/forgot-password",
        method: "patch",
        data: authData,
      });
      return response;
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    (async function () {
      await loadUser(true);
    })();

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
