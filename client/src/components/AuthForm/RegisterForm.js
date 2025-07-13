import { useReducer, useContext } from "react";
import { Link } from "react-router-dom";

import style from "./AuthForm.module.scss";

import { AuthContext } from "~/contexts";
import { authReducer } from "~/reducers";

import classNames from "classnames/bind";

const cx = classNames.bind(style);

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
      <form className={cx("form")} onSubmit={handleSubmit}>
        <div className={cx("title")}>Register</div>

        <div className={cx("form-group", "form-group-username")}>
          <label htmlFor="username">Username:</label>
          <input
            id="username"
            name="username"
            value={authData.username}
            onChange={handleDispatch}
            placeholder="username"
          />
        </div>

        <div className={cx("form-group", "form-group-password")}>
          <label htmlFor="password">Password:</label>
          <input
            id="password"
            name="password"
            value={authData.password}
            onChange={handleDispatch}
            placeholder="password"
          />
        </div>

        <div className={cx("form-group", "form-group-confirm-password")}>
          <label htmlFor="confirmPassword">Confirm password:</label>
          <input
            id="confirmPassword"
            name="confirmPassword"
            value={authData.confirmPassword}
            onChange={handleDispatch}
            placeholder="confirm password"
          />
        </div>

        <Link to="/forgot-password">Forgot your password?</Link>

        <input type="submit" value="Register" />

        <Link to="/login">Have an account? Sign in.</Link>
      </form>
    </>
  );
}

export default RegisterForm;
