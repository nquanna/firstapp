import { useContext, useReducer } from "react";
import { Link } from "react-router-dom";

import classNames from "classnames/bind";

import { AuthHandlerContext } from "~/contexts";
import { authReducer } from "~/reducers";

import style from "./AuthForm.module.scss";

const cx = classNames.bind(style);

function ForgotPasswordForm() {
  const { handleSendOtp, handleDispatch, handleSubmit } = useContext(AuthHandlerContext);

  const [authData, dispatch] = useReducer(authReducer, {
    type: "forgotPassowrd",
    email: "quanhm153@gmail.com",
    otp: "000000",
    password: "Quanbicuopdt192.",
    confirmPassword: "Quanbicuopdt192.",
  });

  return (
    <>
      <form className={cx("form")} onSubmit={(event) => handleSubmit({ event, authData })}>
        <div className={cx("title", "title-forgot-password")}>Forgot Your Password</div>

        <div className={cx("form-group", "form-group-email")}>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
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
            onClick={(event) => handleSendOtp({ event, authData })}
          />
          <input
            type="number"
            name="otp"
            id={cx("otp-code")}
            value={authData.otp}
            onChange={(event) => handleDispatch({ event, type: authData.type, dispatch })}
            placeholder="000000"
          />
          <span className={cx("otp-notification")}></span>
        </div>

        <div className={cx("form-group", "form-group-password")}>
          <label htmlFor="password">New password:</label>
          <input
            id="password"
            name="password"
            value={authData.password}
            onChange={(event) => handleDispatch({ event, type: authData.type, dispatch })}
            placeholder="new password"
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

        <input type="submit" id={cx("reset-password")} value="Reset password" />

        <Link to="/auth/login">Hava an account?</Link>
        <Link to="/auth/register">Create new account?</Link>
      </form>
    </>
  );
}

export default ForgotPasswordForm;
