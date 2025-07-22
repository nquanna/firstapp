import { useReducer } from "react";
import { Link } from "react-router-dom";

import classNames from "classnames/bind";

import style from "./AuthForm.module.scss";

import { authReducer } from "~/reducers";

const cx = classNames.bind(style);

function RegisterForm({ enableTimer, setEnableTimer, timer, handlers }) {
  const { handleDispatch, handleSendOtp, handleSubmit } = handlers;

  const [authData, dispatch] = useReducer(authReducer, {
    type: "register",
    username: "nquanna",
    email: "quanhm153@gmail.com",
    otp: "",
    password: "Quanbicuopdt192.",
    confirmPassword: "Quanbicuopdt192.",
  });

  return (
    <>
      <form
        className={cx("form")}
        onSubmit={async (event) =>
          await handleSubmit({
            event,
            authData,
          })
        }>
        <div className={cx("title")}>Register</div>

        <div className={cx("form-group", "form-group-username")}>
          <label htmlFor={cx("username")}>Username:</label>
          <input
            name="username"
            id={cx("username")}
            value={authData.username}
            onChange={(event) => handleDispatch({ event, type: authData.type, dispatch })}
            placeholder="username"
          />
        </div>

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

        <div className={cx("form-group", "form-group-otp")}>
          <input
            type="submit"
            id={cx("sendOtpBtn")}
            value="Send OTP code"
            disabled={enableTimer}
            onClick={async (event) => {
              setEnableTimer.call({}, true);
              await handleSendOtp({ event, authData });
            }}
          />
          <input
            type="number"
            name="otp"
            id={cx("otp-code")}
            value={authData.otp}
            onChange={(event) => handleDispatch({ event, type: authData.type, dispatch })}
            placeholder="000000"
          />
          <span className={cx("otp-notification", { "otp-notification-hide": !enableTimer })}>
            {`You can resend OTP code after ${timer} seconds.`}
          </span>
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

        <div className={cx("form-group", "form-group-confirm-password")}>
          <label htmlFor={cx("confirmPassword")}>Confirm password:</label>
          <input
            type="text"
            name="confirmPassword"
            id={cx("confirmPassword")}
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
