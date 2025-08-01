import { useRef, useEffect, useState, memo } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";

import classNames from "classnames/bind";

import style from "./SpeechConfig.module.scss";

const cx = classNames.bind(style);

function SpeechConfig({ setConfig }) {
  const langAndVoiceRef = useRef();
  langAndVoiceRef.en = {
    lang: "en-GB",
    david: "Microsoft David - English (United States)",
    mark: "Microsoft Mark - English (United States)",
    zira: "Microsoft Zira - English (United States)",
    google: "Google US English",
  };
  langAndVoiceRef.vi = {
    lang: "vi-VN",
    an: "Microsoft An - Vietnamese (Vietnam)",
  };

  const [rate, setRate] = useState(8);
  const [lang, setLang] = useState(langAndVoiceRef.en.lang);
  const [voiceURI, setVoiceURI] = useState(langAndVoiceRef.en.zira);
  const [showing, setShowing] = useState(false);

  const config = useRef({});

  useEffect(() => {
    config.current = { rate, lang, voiceURI };
    setConfig({ ...config.current });
    // eslint-disable-next-line
  }, [rate, lang, voiceURI]);

  return (
    <div className={cx("speech-config-wrapper")}>
      <div className={cx("icon")} onClick={() => setShowing((prev) => !prev)}>
        <FontAwesomeIcon icon={faBars} />
      </div>

      <div className={cx("speech-config", { hide: !showing })}>
        <div className={cx("config-group-wrapper")}>
          <div className={cx("config-group")}>
            <label>Rate (1 - 100):</label>
            <input
              type="number"
              min={1}
              max={100}
              value={rate}
              onChange={(event) => setRate(event.target.value)}
            />
          </div>

          <div className={cx("config-group")}>
            <select
              value={lang}
              onChange={(event) => {
                setLang(event.target.value);
                setVoiceURI(
                  event.target.value === langAndVoiceRef.vi.lang
                    ? langAndVoiceRef.vi.an
                    : langAndVoiceRef.en.zira
                );
              }}>
              <option value="en-GB">English</option>
              <option value="vi-VN">Vietnamese</option>
            </select>
          </div>

          <div className={cx("config-group")}>
            <select value={voiceURI} onChange={(event) => setVoiceURI(event.target.value)}>
              {lang === langAndVoiceRef.en.lang ? (
                <>
                  <option value={langAndVoiceRef.en.mark}>{langAndVoiceRef.en.mark}</option>
                  <option value={langAndVoiceRef.en.david}>{langAndVoiceRef.en.david}</option>
                  <option value={langAndVoiceRef.en.zira}>{langAndVoiceRef.en.zira}</option>
                  <option value={langAndVoiceRef.en.google}>{langAndVoiceRef.en.google}</option>
                </>
              ) : (
                <>
                  <option value={langAndVoiceRef.vi.an}>{langAndVoiceRef.vi.an}</option>
                </>
              )}
            </select>
          </div>
        </div>

        <div className={cx("close")} onClick={() => setShowing(false)}>
          OK
        </div>
      </div>
    </div>
  );
}

export default memo(SpeechConfig);
