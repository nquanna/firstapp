import { useReducer, useContext } from "react";
import { Link } from "react-router-dom";

import { AuthContext } from "~/contexts";
import { authReducer } from "~/reducers";

function RegisterForm() {
  const { registerUser } = useContext(AuthContext);

  const [authData, dispatch] = useReducer(authReducer, {
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
    await registerUser(authData);
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input
          name="username"
          value={authData.username}
          onChange={handleDispatch}
          placeholder="username"
        />
        <input
          name="password"
          value={authData.password}
          onChange={handleDispatch}
          placeholder="password"
        />
        <input
          name="confirmPassword"
          value={authData.confirmPassword}
          onChange={handleDispatch}
          placeholder="confirm password"
        />

        <input type="submit" value="Register" />
      </form>

      <Link to="/login">Have a account</Link>
    </>
  );
}

export default RegisterForm;
