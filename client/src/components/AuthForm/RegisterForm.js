import { useReducer, useContext } from "react";
import { Link } from "react-router-dom";

import { AuthContext } from "~/contexts";
import authReducer from "~/reducers";

function RegisterForm() {
  const registerUser = useContext(AuthContext);
  const [userData, dispatch] = useReducer(authReducer, {
    username: "",
    password: "",
    confirmPassword: "",
  });

  console.log(registerUser);

  const handleDispatch = (event) => {
    dispatch({
      type: "register",
      target: event.target.name,
      value: event.target.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(userData);
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input name="username" onChange={handleDispatch} placeholder="username" />
        <input name="password" onChange={handleDispatch} placeholder="password" />
        <input name="confirmPassword" onChange={handleDispatch} placeholder="confirm password" />

        <input type="submit" value="submit" />
      </form>

      <Link to="/login">Have a account</Link>
    </>
  );
}

export default RegisterForm;
