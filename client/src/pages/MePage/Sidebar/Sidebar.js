import { useContext } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { faUser, faBell } from "@fortawesome/free-regular-svg-icons";

import classNames from "classnames/bind";

import config from "~/config";
import { AuthContext } from "~/contexts";

import images from "~/assets/images";

import style from "./Sidebar.module.scss";

const cx = classNames.bind(style);

function Sidebar({ occupy }) {
  const { user } = useContext(AuthContext);
  const avatarUrl = user.user?.avatarUrl ? user.user?.avatarUrl : images.defaultAvatar;

  return (
    <div className={occupy}>
      <div className={cx("sidebar-wrapper")}>
        <div className={cx("infomation")}>
          <Link to={config.routes.account}>
            <img src={avatarUrl} alt="User avatar" />
          </Link>

          <span>{user.user?.username}</span>
        </div>

        <Link to={config.routes.account}>
          <FontAwesomeIcon icon={faUser} />
          <span>My account</span>
        </Link>
        <Link to={config.routes.notification}>
          <FontAwesomeIcon icon={faBell} />
          <span>Notification</span>
        </Link>
        <Link to={config.routes.purchaseOrder}>
          <FontAwesomeIcon icon={faCartShopping} />
          <span>Purchase order</span>
        </Link>
      </div>
    </div>
  );
}

export default Sidebar;
