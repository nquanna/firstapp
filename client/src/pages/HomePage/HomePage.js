import { useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import classNames from "classnames/bind";

import { sendNotification } from "~/utils";

import Message from "~/components/Message";

import style from "./HomePage.module.scss";

const cx = classNames.bind(style);

function HomePage() {
  const location = useLocation();
  const type = useRef(location.state?.type);
  const state = useRef(location.state?.state);
  const navigate = useNavigate();

  const showMessage = state.current !== undefined && location.state?.state === undefined;

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
        {showMessage && <Message type={type.current} state={state.current} />}
        <div onClick={sendNotification}>this is home page.</div>
      </div>
    </>
  );
}

export default HomePage;
