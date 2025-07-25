// import classNames from "classnames/bind";
// import style from "./DefaultLayout.module.scss";

import Header from "~/layouts/components/Header";

// const cx = classNames.bind(style);

function DefaultLayout({ children }) {
  return (
    <div className="wrapper">
      <Header />

      <div className="container no-space">{children}</div>
    </div>
  );
}

export default DefaultLayout;
