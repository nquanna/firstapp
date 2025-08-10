import { useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import classNames from "classnames/bind";

import Message from "~/components/Message";

import style from "./HomePage.module.scss";

const cx = classNames.bind(style);

function HomePage() {
  const location = useLocation();
  const type = useRef(location.state?.type);
  const state = useRef(location.state?.state);
  const navigate = useNavigate();

  useEffect(() => {
    if (state.current) {
      if (location.state?.state !== undefined) return navigate(".", { replace: true, state: undefined });

      state.current = undefined;
    }
    // eslint-disable-next-line
  }, []);

  return (
    <>
      <div className={cx("landing")}>
        <Message type={type.current} state={state.current} />
        <div className={cx("text")}>this is home page.</div>
      </div>
    </>
  );
}

export default HomePage;
