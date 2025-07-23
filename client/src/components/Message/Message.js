import { useRef } from "react";
import { createRoot } from "react-dom/client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

import classNames from "classnames/bind";
import style from "./Message.module.scss";

const cx = classNames.bind(style);

function Message(/* { type = "register", state = true } */ { type, state }) {
  const messageRef = useRef();
  const iconRef = useRef();

  const handleUnmount = () => {
    const messageRoof = createRoot(messageRef.current);
    messageRoof?.unmount();
  };

  const colors = {
    true: "19, 158, 92",
    false: "214, 49, 87",
  };

  const messages = {
    register: {
      true: {
        title: "Sign Up Successfully!",
        message: `Account created successfully! You can now log in.`,
      },
      false: {
        title: "Sign Up Failed!",
        message: "Could not create account. Please try again later.",
      },
    },
    login: {
      true: {
        title: "Login Successfully!",
        message: "Login successful! Welcome back.",
      },
      false: {
        title: "Login Failed!",
        message: "Login failed. Please check your email and password.",
      },
    },
    logout: {
      true: {
        title: "Logout Successfully!",
        message: "Logout successful. See you soon!",
      },
      false: {
        title: "Logout Failed!",
        message: "Logout failed. Please try again.",
      },
    },
    forgotPassword: {
      true: {
        title: "Password Updated!",
        message: "Your password has been updated.",
      },
      false: {
        title: "Password Update Error!",
        message: "Could not update password.Try again later.",
      },
    },
  };

  const body = messages[type][state];

  return (
    <div ref={messageRef}>
      <div
        className={cx("message-wrapper")}
        style={{ "--color-state": colors[state] }}
        onAnimationEnd={handleUnmount}>
        <div className={cx("body")}>
          <div className={cx("title")}>{body.title}</div>
          <div className={cx("message")}>{body.message}</div>
        </div>

        <div ref={iconRef} className={cx("icon")} onClick={handleUnmount}>
          <FontAwesomeIcon icon={faXmark} />
        </div>
      </div>
    </div>
  );
}

export default Message;
