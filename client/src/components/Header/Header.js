import { useContext } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";

import classNames from "classnames/bind";

import config from "~/config";
import images from "~/assets/images";

import { AuthContext } from "~/contexts";

import style from "./Header.module.scss";

const cx = classNames.bind(style);

function Header() {
  const { user } = useContext(AuthContext);

  const body = !user.user ? (
    <>
      <Link to={config.routes.register} className={cx("auth-link")}>
        Register
      </Link>
      <Link to={config.routes.login} className={cx("auth-link")}>
        Login
      </Link>
    </>
  ) : (
    <>
      <Link to={config.routes.account} className={cx("auth-link")}>
        My Account
      </Link>
      <Link to={config.routes.purchaseOrder} className={cx("auth-link")}>
        Purchase Order
      </Link>
    </>
  );

  return (
    <header className={cx("wrapper")}>
      <Link to={config.routes.home} className={cx("home-link")}>
        <img src={images.logo} alt="logo" />
      </Link>

      <div className={cx("search-bar")}></div>
      <div className={cx("cart")}></div>

      <div className={cx("auth-wrapper")}>
        <Link to={config.routes.account} className={cx("user-link")}>
          {user.user?.avatar ? (
            <img src={images.logo} alt="user-logo" />
          ) : (
            <FontAwesomeIcon icon={faUser} />
          )}
        </Link>

        <div className={cx("auth-link-wrapper")}>
          {body}

          <Link
            to={config.routes.logout}
            className={cx("auth-link", { disable: !user.user })}
            onClick={(event) => !user.user && event.preventDefault()}>
            Logout
          </Link>
        </div>
      </div>
    </header>
  );
}

export default Header;
