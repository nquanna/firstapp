import { Link } from "react-router-dom";

function LoginForm() {
  return (
    <>
      <input placeholder="username"></input>
      <input placeholder="password"></input>

      <Link to="/register">Create new account</Link>
    </>
  );
}

export default LoginForm;
