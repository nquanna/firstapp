import { useEffect, useRef } from "react";
import classNames from "classnames/bind";
import style from "./Loading.module.scss";

const cx = classNames.bind(style);

function Loading({ isLoading }) {
  const intervalId = useRef();
  const title = useRef();
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

  useEffect(() => {
    let i = 0;
    intervalId.current = setInterval(() => {
      if (title.current.innerText.endsWith("g..")) title.current.innerText += ".";
      else title.current.innerText = title.current.innerText.slice(0, -1);

      const currentIndex = +getComputedStyle(chars[i].current).getPropertyValue("--index").trim();
      chars[i].current.style.setProperty("--index", currentIndex + 1);

      if (i === 6) return (i = 0);
      i++;
    }, 400);

    return () => {
      clearInterval(intervalId.current);
    };
    // eslint-disable-next-line
  }, []);

  return (
    <>
      <div className={cx("landing", { "is-loading": !isLoading })}>
        <div ref={title} className={cx("title")}>
          Loading...
        </div>
        <div className={cx("char-group")}>
          <span ref={char1} className={cx("char")} style={{ "--index": 1 }}>
            n
          </span>
          <span ref={char2} className={cx("char")} style={{ "--index": 2 }}>
            q
          </span>
          <span ref={char3} className={cx("char")} style={{ "--index": 3 }}>
            u
          </span>
          <span ref={char4} className={cx("char")} style={{ "--index": 4 }}>
            a
          </span>
          <span ref={char5} className={cx("char")} style={{ "--index": 5 }}>
            n
          </span>
          <span ref={char6} className={cx("char")} style={{ "--index": 6 }}>
            n
          </span>
          <span ref={char7} className={cx("char")} style={{ "--index": 7 }}>
            a
          </span>
        </div>
      </div>
    </>
  );
}

export default Loading;
