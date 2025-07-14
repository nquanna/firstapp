import classNames from "classnames/bind";

import { RegisterForm, LoginForm, ForgotPasswordForm } from "~/components/AuthForm";

import style from "./authPage.module.scss";

const cx = classNames.bind(style);

function Auth({ routerPath }) {
  let form;
  switch (routerPath) {
    case "/auth/register":
      form = <RegisterForm />;
      break;
    case "/auth/login":
      form = <LoginForm />;
      break;
    case "/auth/forgot-password":
      form = <ForgotPasswordForm />;
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
