import { Navigate } from "react-router-dom";

function Landing() {
  return <Navigate to="/auth/login">this is landing</Navigate>;
}

export default Landing;
