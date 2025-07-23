import { useState, memo } from "react";
import classNames from "classnames/bind";

import style from "./AuthForm.module.scss";

const cx = classNames.bind(style);

function LogoutForm({ handlers: { handleSubmit } }) {
  // console.log("rerender in logout form");

  const [authData, setAuthData] = useState({
    type: "logout",
    isLogout: true,
    isConfirmToLogout: false,
  });

  return (
    <form className={cx("form")} onSubmit={async (event) => await handleSubmit({ event, authData })}>
      <div className={cx("title")}>Logout</div>

      <span className={cx("confirm-text")}>Are you sure you want to log out?</span>

      <div className={cx("form-group", "form-group-logout")}>
        <input
          type="submit"
          id={cx("no")}
          value="No"
          onClick={() =>
            setAuthData((prev) => {
              return { ...prev, isConfirmToLogout: false };
            })
          }
        />
        <input
          type="submit"
          id={cx("logout")}
          value="Yes"
          onClick={() =>
            setAuthData((prev) => {
              return { ...prev, isConfirmToLogout: true };
            })
          }
        />
      </div>
    </form>
  );
}

export default memo(LogoutForm);
