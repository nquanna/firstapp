import { useReducer, useContext } from "react";
import { Link } from "react-router-dom";

import { AuthContext } from "~/contexts";
import { authReducer } from "~/reducers";

function RegisterForm() {
  const { registerUser } = useContext(AuthContext);

  const [userData, dispatch] = useReducer(authReducer, {
    username: "nquanna",
    password: "Quanbicuopdt192.",
    confirmPassword: "Quanbicuopdt192.",
  });

  const handleDispatch = (event) => {
    dispatch({
      type: "register",
      target: event.target.name,
      value: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const newUser = await registerUser(userData);
    console.log("new user: ", newUser);
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input
          name="username"
          onChange={handleDispatch}
          placeholder="username"
          value={userData.username}
        />
        <input
          name="password"
          onChange={handleDispatch}
          placeholder="password"
          value={userData.password}
        />
        <input
          name="confirmPassword"
          onChange={handleDispatch}
          placeholder="confirm password"
          value={userData.confirmPassword}
        />

        <input type="submit" value="submit" />
      </form>

      <Link to="/login">Have a account</Link>
    </>
  );
}

export default RegisterForm;
