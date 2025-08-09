import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping, faBars } from "@fortawesome/free-solid-svg-icons";
import { faUser, faBell } from "@fortawesome/free-regular-svg-icons";

import classNames from "classnames/bind";

import config from "~/config";
import { AuthContext } from "~/contexts";

import images from "~/assets/images";

import style from "./Sidebar.module.scss";

const cx = classNames.bind(style);

function Sidebar({ routerPath }) {
  const [hiddenSidebar, setShowSidebar] = useState(true);

  const { user } = useContext(AuthContext);
  const avatarUrl = user.user?.avatarUrl ? user.user?.avatarUrl : images.defaultAvatar;

  let body;
  switch (routerPath) {
    case config.routes.me:
      body = (
        <div className={cx("me-sidebar")}>
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
      );
      break;
    case config.routes.learn:
      body = (
        <ul className={cx("learn-sidebar", { hidden: hiddenSidebar })}>
          <li className={cx("learn-sidebar-content")}>
            <Link to={config.routes.todayVocabularies}>Today's vocabularies reviews</Link>
          </li>
          <li className={cx("learn-sidebar-content")}>
            <Link to={config.routes.addVocabulary}>Add new vocabulary</Link>
          </li>
          <li className={cx("learn-sidebar-content")}>
            <Link to={config.routes.allVocabularies}>All vocabularies reviews</Link>
          </li>
        </ul>
      );
      break;
    default:
      throw new Error("Invalid router path in sidebar layout!");
  }

  const sidebarWrapperClassName = `col l-3 m-3 ${hiddenSidebar ? "c-1" : "c-12"}
    ${cx("sidebar-wrapper", { hidden: hiddenSidebar })}`;

  return (
    <div className={sidebarWrapperClassName}>
      <div className={cx("sidebar-wrapper-icon")} onClick={() => setShowSidebar((prev) => !prev)}>
        <FontAwesomeIcon icon={faBars} />
      </div>
      {body}
    </div>
  );
}

export default Sidebar;
