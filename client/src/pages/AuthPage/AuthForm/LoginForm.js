import { useReducer, useRef, useEffect, memo } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

import classNames from "classnames/bind";

import Message from "~/components/Message";

import { authReducer } from "~/reducers";

import style from "./AuthForm.module.scss";

const cx = classNames.bind(style);

function LoginForm({ handlers: { handleDispatch, handleSubmit } }) {
  const location = useLocation();
  const state = useRef(location.state?.state);
  const email = useRef(location?.state?.email);
  const navigate = useNavigate();

  const [authData, dispatch] = useReducer(authReducer, {
    type: "",
    email: email.current || "",
    password: "",
    /* type: "login",
    email: email.current || "quanhm153@gmail.com",
    password: "Quanbicuopdt192.", */
  });

  const showMessage = state.current !== undefined && location.state?.state === undefined;

  useEffect(() => {
    if (state.current && location.state?.state === undefined) state.current = undefined;

    if (email.current) {
      navigate(".", { replace: true, state: undefined });
      email.current = undefined;
    }
    // eslint-disable-next-line
  }, []);

  return (
    <>
      {showMessage && <Message type="register" state={state.current} />}

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

export default memo(LoginForm);
