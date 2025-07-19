import { useState, useEffect, useContext, useRef } from "react";
import { useNavigate } from "react-router-dom";
import classNames from "classnames/bind";

import { constanst } from "~/utils";

import { RegisterForm, LoginForm, LogoutForm, ForgotPasswordForm } from "~/components/AuthForm";

import { AuthContext } from "~/contexts";

import config from "~/config";

import style from "./AuthPage.module.scss";

const cx = classNames.bind(style);

function AuthPage({ routerPath }) {
  const { loginUser, registerUser, logoutUser, sendOtp, forgotPassword } = useContext(AuthContext);

  const [enableTimer, setEnableTimer] = useState(false);
  const [timer, setTimer] = useState(constanst.otpDelay);

  const navigate = useNavigate();

  useEffect(() => {
    if (!enableTimer) return;

    if (timer > 0) setTimeout(() => setTimer((prev) => prev - 1), 1000);
    else {
      setEnableTimer(false);
      setTimer(constanst.otpDelay);
    }
  }, [enableTimer, timer]);

  const handleSendOtp = async ({ event, authData }) => {
    try {
      event.preventDefault();
      await sendOtp(authData);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDispatch = ({ event, type, dispatch }) => {
    dispatch({
      type,
      target: event.target.name,
      value: event.target.value,
    });
  };

  const handleSubmit = async ({ event, authData }) => {
    try {
      event.preventDefault();
      // console.log(authData);

      if (!authData?.email && !authData.isLogout) throw new Error("Missing email bro.");

      switch (authData.type) {
        case "register":
          const response = await registerUser(authData);
          if (response.success) {
            await navigate(config.routes.login, {
              state: {
                email: authData.email,
              },
            });
          }
          break;
        case "login":
          await loginUser(authData);
          break;
        case "logout":
          console.log(authData);
          if (authData.isConfirm) await logoutUser();
          return navigate(config.routes.home);
        case "forgotPassword":
          await forgotPassword(authData);
          break;
        default:
          console.log("invalid type of handle submit");
          throw new Error("invalid type of handle submit");
      }
    } catch (error) {
      console.log(error);
      throw new Error("Has an error in auth submit!!");
    }
  };

  const props = {
    enableTimer,
    setEnableTimer,
    timer,
    handlers: { handleDispatch, handleSendOtp, handleSubmit },
  };

  const form = useRef(null);
  switch (routerPath) {
    case "/auth/register":
      form.current = <RegisterForm {...props} />;
      break;
    case "/auth/login":
      form.current = <LoginForm {...props} />;
      break;
    case "/auth/logout":
      form.current = <LogoutForm {...props} />;
      break;
    case "/auth/forgot-password":
      form.current = <ForgotPasswordForm {...props} />;
      break;

    default:
      throw new Error("Router path is invalid!!!");
  }

  return (
    <>
      <div className={cx("landing")}>{form.current}</div>
    </>
  );
}

export default AuthPage;
