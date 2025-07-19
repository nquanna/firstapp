import { useContext } from "react";
import { Link } from "react-router-dom";

import classNames from "classnames/bind";

import style from "./Header.module.scss";

import config from "~/config";
import images from "~/assets/images";

// import { AuthContext } from "~/contexts";

const cx = classNames.bind(style);

function Header() {
  // const { user } = useContext(AuthContext);

  // console.log(user);

  return (
    <header className={cx("wrapper")}>
      <Link to={config.routes.home} className={cx("home-link")}>
        <img src={images.logo} alt="logo" />
      </Link>

      <div className={cx("search-bar")}></div>
      <div className={cx("cart")}></div>

      <div className={cx("auth-wrapper")}>
        <Link to={config.routes.me} className={cx("user-link")}>
          <img src={images.logo} alt="user-logo" />
        </Link>

        <div className={cx("auth-link-wrapper")}>
          <Link to={config.routes.register} className={cx("auth-link")}>
            Register
          </Link>

          <Link to={config.routes.login} className={cx("auth-link")}>
            Login
          </Link>

          <Link to={config.routes.logout} className={cx("auth-link")}>
            Logout
          </Link>
        </div>
      </div>
    </header>
  );
}

export default Header;
