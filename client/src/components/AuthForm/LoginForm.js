import { useReducer, useContext } from "react";
import { Link } from "react-router-dom";

import { authReducer } from "~/reducers";
import { AuthContext } from "~/contexts";

function LoginForm() {
  const [authData, dispatch] = useReducer(authReducer, {
    username: "nquanna",
    password: "Quanbicuopdt192.",
  });

  const { loginUser } = useContext(AuthContext);

  const handleDispatch = (event) => {
    dispatch({
      type: "login",
      target: event.target.name,
      value: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    await loginUser(authData);
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

        <input type="submit" value="Login" />
      </form>

      <Link to="/register">Create new account</Link>
    </>
  );
}

export default LoginForm;
