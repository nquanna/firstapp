import { useState, useEffect, useContext, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import classNames from "classnames/bind";

import config from "~/config";
import { constanst } from "~/utils";

import { RegisterForm, LoginForm, LogoutForm, ForgotPasswordForm } from "~/components/AuthForm";
import Loading from "~/components/Loading";

import { AuthContext } from "~/contexts";

import style from "./AuthPage.module.scss";

const cx = classNames.bind(style);

function AuthPage({ routerPath }) {
  const { loginUser, registerUser, logoutUser, sendOtp, forgotPassword } = useContext(AuthContext);

  const [enableTimer, setEnableTimer] = useState(false);
  const [timer, setTimer] = useState(constanst.otpDelay);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (!enableTimer) return;

    if (timer > 0) setTimeout(() => setTimer((prev) => prev - 1), 1000);
    else {
      setEnableTimer(false);
      setTimer(constanst.otpDelay);
    }
  }, [enableTimer, timer]);

  const handleSendOtp = useCallback(async ({ event, authData }) => {
    event.preventDefault();
    setEnableTimer(true);
    try {
      await sendOtp(authData);
    } catch (error) {
      console.log(error);
    }
    // eslint-disable-next-line
  }, []);

  const handleDispatch = useCallback(({ event, type, dispatch }) => {
    dispatch({
      type,
      target: event.target.name,
      value: event.target.value,
    });
  }, []);

  const handleSubmit = useCallback(async ({ event, authData }) => {
    try {
      event.preventDefault();

      if (!authData?.email && !authData.isLogout) throw new Error("Missing email bro.");

      setIsLoading(true);

      let response;
      switch (authData.type) {
        case "register":
          response = await registerUser(authData);
          setIsLoading(false);
          if (response.success) {
            return await navigate(config.routes.login, {
              state: {
                type: "register",
                state: response.success,
                email: authData.email,
              },
            });
          }
          break;

        case "login":
          response = await loginUser(authData);
          setIsLoading(false);
          return await navigate(config.routes.home, {
            state: {
              type: "login",
              state: response.success,
            },
          });

        case "logout":
          if (authData.isConfirmToLogout) {
            response = await logoutUser();
          }
          setIsLoading(false);
          return await navigate(config.routes.home, {
            state: {
              type: "logout",
              state: response.success,
            },
          });

        case "forgotPassword":
          response = await forgotPassword(authData);
          setIsLoading(false);
          return await navigate(config.routes.home, {
            state: {
              type: "forgotPassword",
              state: response.success,
            },
          });

        default:
          console.log("invalid type of handle submit");
          throw new Error("invalid type of handle submit");
      }
    } catch (error) {
      console.log(error);
      throw new Error("Has an error in auth submit!!");
    }
    // eslint-disable-next-line
  }, []);

  const props = {
    enableTimer,
    timer,
    handlers: { handleDispatch, handleSendOtp, handleSubmit },
  };

  const form = useRef();
  switch (routerPath) {
    case config.routes.register:
      if (form.type === "register" && isLoading) break;
      form.current = <RegisterForm {...props} />;
      form.type = "register";
      break;

    case config.routes.login:
      if (form.type === "login" && isLoading) break;
      form.current = <LoginForm {...props} />;
      form.type = "login";
      break;

    case config.routes.logout:
      if (form.type === "logout" && isLoading) break;
      form.current = <LogoutForm {...props} />;
      form.type = "logout";
      break;

    case config.routes.forgotPassword:
      if (form.type === "forgotPassword" && isLoading) break;
      form.current = <ForgotPasswordForm {...props} />;
      form.type = "forgotPassword";
      break;

    default:
      throw new Error("Router path is invalid!!!");
  }

  return (
    <>
      <div className={cx("landing")}>
        {isLoading && <Loading />}
        {form.current}
      </div>
    </>
  );
}

export default AuthPage;
