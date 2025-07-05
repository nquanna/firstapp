import LoginForm from "~/components/AuthForm/LoginForm";
import RegisterForm from "~/components/AuthForm/RegisterForm";

function Auth({ isLogin }) {
  return <>{isLogin ? <LoginForm /> : <RegisterForm />}</>;
}

export default Auth;
