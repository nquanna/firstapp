import classNames from "classnames/bind";

import style from "./SpeakAgain.module.scss";
const cx = classNames.bind(style);

function SpeakAgain({ setSpeech, message, destroy }) {
  return (
    <div className={cx("speak-again-wrapper")}>
      <div className={cx("title")}>Speak again this message:</div>
      <div className={cx("message-will-speak-again")}>{message}</div>

      <div className={cx("select-wrapper")}>
        <input name={0} type="button" value="Cancel" onClick={() => destroy(false)} />
        <input name={1} type="button" value="Speak again" onClick={() => setSpeech(message)} />
      </div>
    </div>
  );
}

export default SpeakAgain;
