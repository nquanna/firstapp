import { createContext, useEffect, useReducer } from "react";

import { userReducer } from "~/reducers";
import api from "~/utils/api";

const AuthContext = createContext();
const AuthContextProvider = ({ children }) => {
  const [user, dispatch] = useReducer(userReducer, {
    isAuthenticated: false,
    authLoading: true,
    user: null,
  });

  const loadUser = async () => {
    if (!process.env.REACT_APP_TOKEN_KEY || !localStorage[process.env.REACT_APP_TOKEN_KEY]) return;
    const token = JSON.parse(localStorage[process.env.REACT_APP_TOKEN_KEY]);

    api.setHeaders(token);

    const response = await api.request({
      path: "/auth",
      method: "post",
    });

    console.log("response:", response);
    if (response.success) {
      dispatch({
        type: "set_user",
        isAuthenticated: true,
        user: response.user,
      });
    }
  };

  const loginUser = async (userData) => {};

  const registerUser = async (userData) => {
    const user = await api.request({
      path: "/auth/register",
      method: "post",
      data: userData,
    });

    if (user.token) {
      api.token(user.token);
      await loadUser();
    }

    return user;
  };

  const logoutUser = async (userData) => {};

  useEffect(() => {
    loadUser();
  }, []);

  const authContextData = { loadUser, loginUser, registerUser, logoutUser, user };
  return <AuthContext.Provider value={authContextData}>{children}</AuthContext.Provider>;
};

export { AuthContext };
export default AuthContextProvider;
