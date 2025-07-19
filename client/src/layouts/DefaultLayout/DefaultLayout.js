// import classNames from "classnames/bind";
// import style from "./DefaultLayout.module.scss";

import Header from "~/components/Header";

// const cx = classNames.bind(style);

function DefaultLayout({ children }) {
  return (
    <>
      <Header />
      {children}
    </>
  );
}

export default DefaultLayout;
