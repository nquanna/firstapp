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
          <Sidebar occupy="col l-3 m-3 c-8" routerPath={routerPath} />
          {children}
        </div>
      </div>
    </div>
  );
}

export default SidebarLayout;
