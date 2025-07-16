import { useContext, useReducer } from "react";
import { Link } from "react-router-dom";

import classNames from "classnames/bind";

import { AuthHandlerContext } from "~/contexts";
import { authReducer } from "~/reducers";

import style from "./AuthForm.module.scss";

const cx = classNames.bind(style);

function ForgotPasswordForm({ enableTimer, setEnableTimer, timer }) {
  const { handleSendOtp, handleDispatch, handleSubmit } = useContext(AuthHandlerContext);

  const [authData, dispatch] = useReducer(authReducer, {
    type: "forgotPassword",
    email: "quanhm153@gmail.com",
    otp: "",
    password: "Quanbicuopdt192.",
    confirmPassword: "Quanbicuopdt192.",
  });

  return (
    <>
      <form className={cx("form")} onSubmit={(event) => handleSubmit({ event, authData })}>
        <div className={cx("title", "title-forgot-password")}>Forgot Your Password</div>

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
            value="Send otp code"
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
          <label htmlFor={cx("password")}>New password:</label>
          <input
            type="text"
            name="password"
            id={cx("password")}
            value={authData.password}
            onChange={(event) => handleDispatch({ event, type: authData.type, dispatch })}
            placeholder="new password"
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

        <input type="submit" id={cx("reset-password")} value="Reset password" />

        <Link to="/auth/login">Hava an account?</Link>
        <Link to="/auth/register">Create new account?</Link>
      </form>
    </>
  );
}

export default ForgotPasswordForm;
