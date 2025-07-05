import { createContext } from "react";

const AuthContext = createContext();
const AuthContextProvider = ({ children }) => {
  const loadUser = async (userData) => {};

  const loginUser = async (userData) => {};
  const registerUser = async (userData) => {};

  const authContextData = { loadUser, loginUser, registerUser };

  return <AuthContext.Provider value={authContextData}>{children}</AuthContext.Provider>;
};

export { AuthContext };
export default AuthContextProvider;
