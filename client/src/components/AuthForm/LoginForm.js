import { Link } from "react-router-dom";

function LoginForm() {
  return (
    <>
      <form>
        <input placeholder="username" />
        <input placeholder="password" />

        <input type="submit" value="submit" />
      </form>

      <Link to="/register">Create new account</Link>
    </>
  );
}

export default LoginForm;
