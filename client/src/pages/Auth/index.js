import LoginForm from "~/components/AuthForm/LoginForm";
import RegisterForm from "~/components/AuthForm/RegisterForm";

function Auth({ routerPath }) {
  return <>{routerPath === "login" ? <LoginForm /> : <RegisterForm />}</>;
}

export default Auth;
