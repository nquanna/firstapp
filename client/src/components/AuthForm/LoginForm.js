import { useReducer, useContext } from "react";
import { Link } from "react-router-dom";

import style from "./AuthForm.module.scss";

import { authReducer } from "~/reducers";
import { AuthContext } from "~/contexts";

import classNames from "classnames/bind";

const cx = classNames.bind(style);

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
      <form className={cx("form")} onSubmit={handleSubmit}>
        <div className={cx("title")}>Login</div>

        <div className={cx("form-group", "form-group-username")}>
          <label htmlFor="username">Username:</label>
          <input
            name="username"
            value={authData.username}
            onChange={handleDispatch}
            placeholder="username"
          />
        </div>
        <div className={cx("form-group", "form-group-password")}>
          <label htmlFor="password">Password:</label>
          <input
            name="password"
            value={authData.password}
            onChange={handleDispatch}
            placeholder="password"
          />
        </div>

        <Link to="/forgot-password">Forgot your password?</Link>

        <input type="submit" value="Login" />

        <Link to="/register">Create new account? Register.</Link>
      </form>
    </>
  );
}

export default LoginForm;
