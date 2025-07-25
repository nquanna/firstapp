// import classNames from "classnames/bind";

import Header from "~/layouts/components/Header";
import Sidebar from "~/layouts/components/Sidebar";

// import style from "./SidebarLayout.module.scss";
// const cx = classNames.bind(style);

function SidebarLayout({ children }) {
  return (
    <div className="wrapper">
      <Header />

      <div className="container grid wide">
        <div className="row">
          <Sidebar occupy="col l-2 m-4 c-0" />
          {children}
        </div>
      </div>
    </div>
  );
}

export default SidebarLayout;
