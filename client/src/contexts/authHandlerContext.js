import { createContext, useContext } from "react";

import { AuthContext } from "./authContext";

const AuthHandlerContext = createContext();
function AuthHandlerContextProvider({ children }) {
  // eslint-disable-next-line
  const { loginUser, registerUser, logoutUser, sendOtp, forgotPassword } = useContext(AuthContext);

  const handleSendOtp = async ({ event, authData }) => {
    try {
      event.preventDefault();
      await sendOtp({ email: authData.email });
    } catch (error) {
      console.log(error);
    }
  };

  const handleDispatch = ({ event, type, dispatch }) => {
    dispatch({
      type,
      target: event.target.name,
      value: event.target.value,
    });
  };

  const handleSubmit = async ({ event, authData, navigate }) => {
    try {
      event.preventDefault();
      // console.log(authData);

      if (!authData?.email) throw new Error("Missing email bro.");

      switch (authData.type) {
        case "register":
          const response = await registerUser(authData);
          if (response.success && navigate instanceof Function) {
            await navigate("/auth/login", {
              state: {
                email: authData.email,
              },
            });
          } else {
            console.log(response);
          }
          break;
        case "login":
          await loginUser(authData);
          break;
        case "forgotPassword":
          await forgotPassword(authData);
          break;
        default:
          console.log("invalid type of handle submit");
          throw new Error("invalid type of handle submit");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const authHandlers = { handleSendOtp, handleDispatch, handleSubmit };

  return <AuthHandlerContext.Provider value={authHandlers}>{children}</AuthHandlerContext.Provider>;
}

export { AuthHandlerContext };
export default AuthHandlerContextProvider;
