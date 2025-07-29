import classNames from "classnames/bind";
import style from "./Message.module.scss";

const cx = classNames.bind(style);

function Message({ role, message }) {
  return <div className={cx("message", role)}>{message}</div>;
}

export default Message;
