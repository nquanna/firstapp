import { useReducer, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";

import style from "./AuthForm.module.scss";

import { AuthHandlerContext } from "~/contexts";
import { authReducer } from "~/reducers";

import classNames from "classnames/bind";

const cx = classNames.bind(style);

function RegisterForm() {
  const { handleSendOtp, handleDispatch, handleSubmit } = useContext(AuthHandlerContext);

  const [authData, dispatch] = useReducer(authReducer, {
    type: "register",
    email: "quanhm153@gmail.com",
    otp: "",
    password: "Quanbicuopdt192.",
    confirmPassword: "Quanbicuopdt192.",
  });

  const navigate = useNavigate();

  return (
    <>
      <form
        className={cx("form")}
        onSubmit={async (event) =>
          await handleSubmit({
            event,
            authData,
            navigate,
          })
        }>
        <div className={cx("title")}>Register</div>

        <div className={cx("form-group", "form-group-email")}>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={authData.email}
            onChange={(event) => handleDispatch({ event, type: authData.type, dispatch })}
            placeholder="email"
          />
        </div>

        <div className={cx("form-group", "form-group-otp")}>
          <input
            type="submit"
            id={cx("sendBtn")}
            value="Send otp code"
            onClick={async (event) => await handleSendOtp({ event, authData })}
          />
          <input
            type="number"
            name="otp"
            id={cx("otp-code")}
            value={authData.otp}
            onChange={(event) => handleDispatch({ event, type: authData.type, dispatch })}
            placeholder="000000"
          />
        </div>

        <div className={cx("form-group", "form-group-password")}>
          <label htmlFor="password">Password:</label>
          <input
            id="password"
            name="password"
            value={authData.password}
            onChange={(event) => handleDispatch({ event, type: authData.type, dispatch })}
            placeholder="password"
          />
        </div>

        <div className={cx("form-group", "form-group-confirm-password")}>
          <label htmlFor="confirmPassword">Confirm password:</label>
          <input
            id="confirmPassword"
            name="confirmPassword"
            value={authData.confirmPassword}
            onChange={(event) => handleDispatch({ event, type: authData.type, dispatch })}
            placeholder="confirm password"
          />
        </div>

        <Link to="/auth/forgot-password">Forgot your password?</Link>

        <input type="submit" id={cx("registerBtn")} value="Register" />

        <Link to="/auth/login">Have an account?</Link>
      </form>
    </>
  );
}

export default RegisterForm;
