import { useRef, useEffect, useState, memo } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faGear } from "@fortawesome/free-solid-svg-icons";
import classNames from "classnames/bind";

import { api, defaultTrainingContent } from "~/utils";

import style from "./Config.module.scss";

const cx = classNames.bind(style);

function Config({
  setSpeechConfig,
  audioStoreRef,
  setMessages,
  useTraining,
  setUseTraining,
  setTrainingContent,
}) {
  /* SPEECH CONFIG */
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
  const [showingSpeechConfig, setShowingSpeechConfig] = useState(false);
  const [showingRemoveCache, setShowingRemoveCache] = useState(false);
  const [showingTrainingContent, setShowingTrainingContent] = useState(true);

  const textareaRef = useRef();

  /* REMOVE CACHE */
  const handleRemoveCache = async (event) => {
    event.preventDefault();
    setShowingRemoveCache((prev) => !prev);

    if (!+event.target.name) return;
    const response = await api.request({ method: "get", path: "/ai/remove-cache" });
    if (response.success) {
      audioStoreRef.ai = [];
      audioStoreRef.user = [];

      setMessages([]);
    }
  };

  useEffect(() => {
    setSpeechConfig({ rate: rate / 10, lang, voiceURI });
    // eslint-disable-next-line
  }, [rate, lang, voiceURI]);

  /* USE TRAINING */

  /* TRAINING CONTENTS */
  useEffect(() => {
    setShowingTrainingContent(false);
    setTrainingContent(textareaRef.current?.value);
    // eslint-disable-next-line
  }, []);

  return (
    <div className={cx("config-wrapper")}>
      <div className={cx("training-wrapper")}>
        <div className={cx("icon")} onClick={() => setShowingTrainingContent((prev) => !prev)}>
          <FontAwesomeIcon icon={faGear} />
        </div>
        {showingTrainingContent && (
          <textarea
            ref={textareaRef}
            className={cx("training-content")}
            defaultValue={defaultTrainingContent}
            onChange={(event) => setTrainingContent(event.target.value)}
          />
        )}
      </div>

      <div className={cx("speech-config-wrapper")}>
        <div className={cx("icon")} onClick={() => setShowingSpeechConfig((prev) => !prev)}>
          <FontAwesomeIcon icon={faBars} />
        </div>

        <div className={cx("speech-config", { hide: !showingSpeechConfig })}>
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

          <div className={cx("close")} onClick={() => setShowingSpeechConfig(false)}>
            OK
          </div>
        </div>
      </div>

      <div className={cx("remove-cache-wrapper")}>
        <div className={cx("remove-cache-btn")} onClick={handleRemoveCache}>
          <div className={cx("text")}>Remove Cache</div>
        </div>

        {showingRemoveCache && (
          <div className={cx("remove-cache-confirm-wrapper")}>
            <div className={cx("title")}>
              REMOVE CACHE.
              <br /> Are you sure?
            </div>
            <div className={cx("selections")}>
              <input
                type="submit"
                name={0}
                value="Cancel"
                onClick={(event) => {
                  handleRemoveCache(event);
                }}
              />
              <input
                type="submit"
                name={1}
                value="Remove"
                onClick={(event) => {
                  handleRemoveCache(event);
                }}
              />
            </div>
          </div>
        )}
      </div>

      <div className={cx("use-training-wrapper")}>
        <input
          type="checkbox"
          defaultChecked={useTraining}
          onChange={() => setUseTraining((prev) => !prev)}
        />
      </div>
    </div>
  );
}

export default memo(Config);
