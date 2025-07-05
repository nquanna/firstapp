import { Link } from "react-router-dom";

function RegisterForm() {
  return (
    <>
      <input placeholder="username"></input>
      <input placeholder="password"></input>
      <input placeholder="confirm password"></input>

      <br />

      <Link to="/login">Have a account</Link>
    </>
  );
}

export default RegisterForm;
