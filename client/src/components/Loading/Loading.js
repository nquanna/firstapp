import { useEffect, useRef, useState } from "react";
import classNames from "classnames/bind";
import style from "./Loading.module.scss";

const cx = classNames.bind(style);

function Loading() {
  const [title, setTitle] = useState("Loading...");
  const intervalId = useRef();
  const [char1, char2, char3, char4, char5, char6, char7] = [
    useRef(),
    useRef(),
    useRef(),
    useRef(),
    useRef(),
    useRef(),
    useRef(),
  ];
  const chars = [char1, char2, char3, char4, char5, char6, char7];

  const textsLoading = ["Loading...", "Loading..", "Loading."];

  useEffect(() => {
    let [i, j] = [0, 0];
    let isIncreasing = false;

    intervalId.title = setInterval(() => {
      setTitle(textsLoading[j]);
      if (isIncreasing) {
        j -= 1;
        if (j === 0) isIncreasing = false;
      } else {
        j += 1;
        if (j === 2) isIncreasing = true;
      }
    }, 500);

    intervalId.charRotating = setInterval(() => {
      const currentIndex = +getComputedStyle(chars[i].current).getPropertyValue("--index").trim();
      chars[i].current.style.setProperty("--index", currentIndex + 1);

      if (i === 6) return (i = 0);
      i++;
    }, 250);

    return () => {
      clearInterval(intervalId.title);
      clearInterval(intervalId.charRotating);
    };
    // eslint-disable-next-line
  }, []);

  return (
    <div className={cx("landing")}>
      <div className={cx("loading-wrapper")}>
        <div className={cx("title")}>{title}</div>
        <div className={cx("char-group")}>
          <span ref={char1} className={cx("char")} style={{ "--index": 1, "--color": "rgb(255, 0, 0)" }}>
            n
          </span>
          <span
            ref={char2}
            className={cx("char")}
            style={{ "--index": 2, "--color": "rgb(255, 142, 0)" }}>
            q
          </span>
          <span
            ref={char3}
            className={cx("char")}
            style={{ "--index": 3, "--color": "rgb(255, 255, 0)" }}>
            u
          </span>
          <span ref={char4} className={cx("char")} style={{ "--index": 4, "--color": "rgb(0, 142, 0)" }}>
            a
          </span>
          <span
            ref={char5}
            className={cx("char")}
            style={{ "--index": 5, "--color": "rgb(0, 192, 192)" }}>
            n
          </span>
          <span
            ref={char6}
            className={cx("char")}
            style={{ "--index": 6, "--color": "rgb(64, 0, 152)" }}>
            n
          </span>
          <span
            ref={char7}
            className={cx("char")}
            style={{ "--index": 7, "--color": "rgb(142, 0, 142)" }}>
            a
          </span>
        </div>
      </div>
    </div>
  );
}

export default Loading;
