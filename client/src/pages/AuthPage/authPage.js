import classNames from "classnames/bind";

import LoginForm from "~/components/AuthForm/LoginForm";
import RegisterForm from "~/components/AuthForm/RegisterForm";

import style from "./authPage.module.scss";

const cx = classNames.bind(style);

function Auth({ routerPath }) {
  const form = <>{routerPath === "/login" ? <LoginForm /> : <RegisterForm />}</>;
  return (
    <>
      <div className={cx("landing")}>{form}</div>
    </>
  );
}

export default Auth;
