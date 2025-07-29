import { useContext } from "react";
import { Link } from "react-router-dom";

import classNames from "classnames/bind";

import config from "~/config";
import images from "~/assets/images";

import { AuthContext } from "~/contexts";

import style from "./Header.module.scss";

const cx = classNames.bind(style);

function Header() {
  const { user } = useContext(AuthContext);

  const body = !user.isAuthenticated ? (
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
    <header className={cx("header-wrapper")}>
      <div className={cx("home-link-wrapper")}>
        <Link to={config.routes.home} className={cx("home-link")}>
          <img src={images.logo} alt="logo" />
        </Link>
      </div>

      <div className={cx("ai-link-wrapper")}>
        <Link to={config.routes.ai} className={cx("ai-link")}>
          <img src={images.logo} alt="logo" />
        </Link>
      </div>

      <div className={cx("search-bar")}></div>
      <div className={cx("cart")}></div>

      <div className={cx("auth-wrapper")}>
        <Link to={config.routes.account} className={cx("user-link")}>
          <img
            src={user.user?.avatarUrl ? user.user.avatarUrl : images.defaultAvatar}
            alt="user-avatar"
          />

          <span>{user.isAuthenticated ? user.user.username : ""}</span>
        </Link>

        <div className={cx("auth-link-wrapper")}>
          {body}

          <Link
            to={config.routes.logout}
            className={cx("auth-link", { disable: !user.isAuthenticated })}
            onClick={(event) => !user.isAuthenticated && event.preventDefault()}>
            Logout
          </Link>
        </div>
      </div>
    </header>
  );
}

export default Header;
