import classNames from "classnames/bind";

import { LoginForm, RegisterForm } from "~/components/AuthForm";

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
