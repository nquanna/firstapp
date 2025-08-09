// import classNames from "classnames/bind";

import Header from "~/layouts/components/Header";
import Sidebar from "~/layouts/components/Sidebar";

// import style from "./SidebarLayout.module.scss";
// const cx = classNames.bind(style);

function SidebarLayout({ routerPath, children }) {
  return (
    <div className="wrapper">
      <Header />

      <div className="container grid wide">
        <div className="row">
          <Sidebar routerPath={routerPath} />
          {children}
        </div>
      </div>
    </div>
  );
}

export default SidebarLayout;
