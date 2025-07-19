import { useState } from "react";
import classNames from "classnames/bind";

import style from "./AuthForm.module.scss";

const cx = classNames.bind(style);

function LogoutForm({ handlers: { handleSubmit } }) {
  const [authData, setAuthData] = useState({
    type: "logout",
    isLogout: true,
    isConfirm: false,
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
              return { ...prev, isConfirm: false };
            })
          }
        />
        <input
          type="submit"
          id={cx("logout")}
          value="Yes"
          onClick={() =>
            setAuthData((prev) => {
              return { ...prev, isConfirm: true };
            })
          }
        />
      </div>
    </form>
  );
}

export default LogoutForm;
