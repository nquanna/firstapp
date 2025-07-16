import { useState, useEffect } from "react";
import classNames from "classnames/bind";

import { constanst } from "~/utils";

import { RegisterForm, LoginForm, ForgotPasswordForm } from "~/components/AuthForm";

import style from "./authPage.module.scss";

const cx = classNames.bind(style);

function Auth({ routerPath }) {
  const [enableTimer, setEnableTimer] = useState(false);
  const [timer, setTimer] = useState(constanst.otpDelay);

  useEffect(() => {
    if (!enableTimer) return;

    if (timer > 0) setTimeout(() => setTimer((prev) => prev - 1), 1000);
    else {
      setEnableTimer(false);
      setTimer(constanst.otpDelay);
    }
  }, [enableTimer, timer]);

  let form;
  switch (routerPath) {
    case "/auth/register":
      form = <RegisterForm enableTimer={enableTimer} setEnableTimer={setEnableTimer} timer={timer} />;
      break;
    case "/auth/login":
      form = <LoginForm />;
      break;
    case "/auth/forgot-password":
      form = (
        <ForgotPasswordForm enableTimer={enableTimer} setEnableTimer={setEnableTimer} timer={timer} />
      );
      break;
    default:
      form = null;
      break;
  }

  return (
    <>
      <div className={cx("landing")}>{form}</div>
    </>
  );
}

export default Auth;
