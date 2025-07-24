import { useContext, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

import classNames from "classnames/bind";
import style from "./MePage.module.scss";

import config from "~/config";

import { Account, Notification, PurchaseOrder } from "./Content";

import { AuthContext } from "~/contexts";

import Sidebar from "./Sidebar";

const cx = classNames.bind(style);

function MePage({ routerPath }) {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user.user) {
      // navigate(config.routes.home);
    }
    // eslint-disable-next-line
  }, []);

  const classNameWrapper = `grid wide ${cx("me-wrapper")}`;

  const content = useRef();
  const props = {
    occupy: "col l-10 m-8 c-12",
  };
  switch (routerPath) {
    case config.routes.account:
      content.current = <Account {...props} />;
      break;
    case config.routes.notification:
      content.current = <Notification {...props} />;
      break;
    case config.routes.purchaseOrder:
      content.current = <PurchaseOrder {...props} />;
      break;
    default:
  }

  return (
    <div className={classNameWrapper}>
      <div className="row ">
        <Sidebar occupy="col l-2 m-4 c-0" />
        {content.current}
        {/* <div className="col l-10 m-8 c-12"></div> */}
      </div>
    </div>
  );
}

export default MePage;
