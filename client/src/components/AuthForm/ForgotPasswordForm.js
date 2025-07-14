import { useContext, useReducer } from "react";
import { Link } from "react-router-dom";

import classNames from "classnames/bind";

import { AuthContext } from "~/contexts";
import { authReducer } from "~/reducers";

import style from "./AuthForm.module.scss";

const cx = classNames.bind(style);

function ForgotPasswordForm() {
  const [authData, dispatch] = useReducer(authReducer, {
    email: "quanhm153@gmail.com",
    otp: "000000",
    password: "Quanbicuopdt192.",
    confirmPassword: "Quanbicuopdt192.",
  });

  const { forgotPassword } = useContext(AuthContext);

  const handleDispatch = (event) => {
    dispatch({
      type: "forgotPassword",
      target: event.target.name,
      value: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(authData);

    await forgotPassword(authData);
  };

  return (
    <>
      <form className={cx("form")} onSubmit={handleSubmit}>
        <div className={cx("title", "title-forgot-password")}>Forgot Your Password</div>

        <div className={cx("form-group", "form-group-email")}>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            name="email"
            value={authData.email}
            onChange={handleDispatch}
            placeholder="email"
          />
        </div>

        <div className={cx("form-group", "form-group-otp")}>
          <input type="submit" id={cx("sendBtn")} value="Send otp code" />
          <input
            type="number"
            name="otp"
            id={cx("otp-code")}
            value={authData.otp}
            onChange={handleDispatch}
            placeholder="000000"
          />
        </div>

        <div className={cx("form-group", "form-group-password")}>
          <label htmlFor="password">New password:</label>
          <input
            id="password"
            name="password"
            value={authData.password}
            onChange={handleDispatch}
            placeholder="new password"
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

        <input type="submit" id={cx("reset-password")} value="Reset password" />

        <Link to="/auth/login">Hava an account?</Link>
        <Link to="/auth/register">Create new account?</Link>
      </form>
    </>
  );
}

export default ForgotPasswordForm;
