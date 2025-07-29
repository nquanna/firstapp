import { /* useContext, */ useRef } from "react";

import classNames from "classnames/bind";
import style from "./MePage.module.scss";

import config from "~/config";

import { Account, Notification, PurchaseOrder } from "./Content";

// import { AuthContext } from "~/contexts";

const cx = classNames.bind(style);

function MePage({ routerPath }) {
  // const { user } = useContext(AuthContext);

  const classNameWrapper = `col l-10 m-8 c-12 ${cx("me-wrapper")}`;

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
      <div className="">{content.current}</div>
    </div>
  );
}

export default MePage;
