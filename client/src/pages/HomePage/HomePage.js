import classNames from "classnames/bind";
import style from "./HomePage.module.scss";
// import { Navigate } from "react-router-dom";

const cx = classNames.bind(style);

function HomePage() {
  // return <Navigate to="/auth/login">this is landing</Navigate>;
  return (
    <>
      <div className={cx("landing")}>this is home page.</div>
    </>
  );
}

export default HomePage;
