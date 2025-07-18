import { createContext, useEffect, useReducer } from "react";

import { userReducer } from "~/reducers";
import { api } from "~/utils";

const AuthContext = createContext();
const AuthContextProvider = ({ children }) => {
  const [user, dispatch] = useReducer(userReducer, {
    isAuthenticated: false,
    user: null,
  });

  const loadUser = async () => {
    const response = await api.request({
      path: "/auth",
      method: "post",
    });

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

    if (response.success) {
      await loadUser();
    }

    return response;
  };

  const registerUser = async (authData) => {
    const response = await api.request({
      path: "/auth/register",
      method: "post",
      data: authData,
    });

    return response;
  };

  const logoutUser = async () => {
    const response = await api.request({
      path: "/auth/logout",
      method: "post",
    });

    dispatch({
      isAuthenticated: false,
      user: null,
    });
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
      console.log("cannot send otp, why???");
    }
  };

  const forgotPassword = async (authData) => {
    try {
      await api.request({
        path: "/auth/forgot-password",
        method: "patch",
        data: authData,
      });
    } catch (error) {
      console.log("what the hell");
    }
  };

  useEffect(() => {
    // loadUser();
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
