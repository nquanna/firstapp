import { useReducer, useContext } from "react";
import { Link, useLocation } from "react-router-dom";

import style from "./AuthForm.module.scss";

import { authReducer } from "~/reducers";
import { AuthHandlerContext } from "~/contexts";

import classNames from "classnames/bind";

const cx = classNames.bind(style);

function LoginForm() {
  const location = useLocation();
  const { handleDispatch, handleSubmit } = useContext(AuthHandlerContext);
  const [authData, dispatch] = useReducer(authReducer, {
    type: "login",
    email: location?.state?.email || "quanhm153@gmail.com2",
    password: "Quanbicuopdt192.",
  });

  return (
    <>
      <form className={cx("form")} onSubmit={(event) => handleSubmit({ event, authData })}>
        <div className={cx("title")}>Login</div>

        <div className={cx("form-group", "form-group-email")}>
          <label htmlFor={cx("email")}>Email:</label>
          <input
            type="email"
            name="email"
            id={cx("email")}
            value={authData.email}
            onChange={(event) => handleDispatch({ event, type: authData.type, dispatch })}
            placeholder="email"
          />
        </div>
        <div className={cx("form-group", "form-group-password")}>
          <label htmlFor={cx("password")}>Password:</label>
          <input
            type="text"
            name="password"
            id={cx("password")}
            value={authData.password}
            onChange={(event) => handleDispatch({ event, type: authData.type, dispatch })}
            placeholder="password"
          />
        </div>

        <Link to="/auth/forgot-password">Forgot your password?</Link>

        <input type="submit" id={cx("loginBtn")} value="Login" />

        <Link to="/auth/register">Create new account?</Link>
      </form>
    </>
  );
}

export default LoginForm;
