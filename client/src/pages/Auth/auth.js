// import classNames from "classnames/bind";

import LoginForm from "~/components/AuthForm/LoginForm";
import RegisterForm from "~/components/AuthForm/RegisterForm";

// import style from "./auth.module.scss"

// const cx = classNames.bind(style)

function Auth({ routerPath }) {
  return <>{routerPath === "/login" ? <LoginForm /> : <RegisterForm />}</>;
}

export default Auth;
