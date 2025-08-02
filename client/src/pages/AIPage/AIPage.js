import { useRef, useEffect, useState } from "react";
import Speech, { useSpeak, HighlightedText } from "react-text-to-speech";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMicrophone, faMicrophoneSlash, faArrowUp } from "@fortawesome/free-solid-svg-icons";

import classNames from "classnames/bind";

import Options from "./Options";
import SpeechConfig from "./SpeechConfig";

import { api } from "~/utils";
import getMicro from "./getMicro";

import style from "./AIPage.module.scss";

const cx = classNames.bind(style);

function AIPage() {
  const [messages, setMessages] = useState([]);
  const [prompt, setPrompt] = useState("");
  const [options, setOptions] = useState();
  const [microIcon, setMicroIcon] = useState(true);
  const [isSpeak, setIsSpeak] = useState(true);
  const [config, setConfig] = useState();

  const uniqueIdRef = useRef(-1);
  const audioStoreRef = useRef();
  const [optionsRef, promptWrapper, textarea] = [useRef(), useRef(), useRef()];
  const uploadRef = useRef();

  const { speak } = useSpeak();

  useEffect(() => {
    // initial
    promptWrapper.height = getComputedStyle(promptWrapper.current).height;
    document.documentElement.style.setProperty("--prompt-height", promptWrapper.height);

    optionsRef.height = getComputedStyle(optionsRef.current).height;
    document.documentElement.style.setProperty("--options-height", optionsRef.height);

    audioStoreRef.user = [];
    audioStoreRef.ai = [];

    getMicro({ inputType: "text", method: "init" });
    getMicro({ inputType: "text", method: "assignSetText", setPrompt: handleSetPrompt });

    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    uploadRef.current.classList.toggle(cx("disable"), !audioStoreRef.audio && !prompt.trim());
  }, [audioStoreRef.audio, prompt]);

  const handleSetPrompt = ({ event, audioText }) => {
    event && setPrompt(event.target.value);
    audioText && setPrompt((prev) => `${prev ? prev : ""} ${audioText}`.trim());
  };

  const handleRecording = async () => {
    const data = await getMicro({
      inputType: options.inputType,
      method: microIcon ? "start" : "stop",
      audioStoreRef,
    });
    setMicroIcon((prev) => !prev);

    if (!data) return;
    audioStoreRef.audio = data;
    audioStoreRef.user.push(URL.createObjectURL(audioStoreRef.audio));
  };

  const handleSendPrompt = async () => {
    console.log("prompt:", prompt.trim());
    if (!prompt.trim() && !audioStoreRef.audio) return;

    const newMessage = `${audioStoreRef.audio ? "*this is audio file*" : ""} ${prompt.trim() && prompt}`;
    setMessages((prev) => [...prev, { role: "user", message: newMessage.trim() }]);

    setPrompt("");

    const formData = new FormData();
    formData.append("prompt", prompt);
    formData.append("outputType", options.outputType);
    formData.append("model", options.model);
    audioStoreRef.audio && formData.append("audio", audioStoreRef.audio, "audio.wav");
    audioStoreRef.audio = null;

    const responseMessage = await api.request({
      method: "post",
      path: "/ai/call-model",
      data: formData,
    });

    if (!responseMessage.success) return;
    setMessages((prev) => [...prev, { role: "ai", message: responseMessage.message }]);
    isSpeak && speak(responseMessage.message, { ...config });
  };

  const handleSendPromptByEnter = (event) => {
    if (event.code !== "Enter") return;
    if (event.shiftKey) return;

    event.preventDefault();
    handleSendPrompt();
  };

  return (
    <div className={cx("ai-page-wrapper")}>
      <SpeechConfig setConfig={setConfig} />

      <div className={cx("audio-store")}>
        {audioStoreRef.ai?.map((audioURL, index) => (
          <audio src={audioURL} controls key={index} />
        ))}
      </div>

      <div className={cx("ai-interactive")}>
        <Options setOptions={setOptions} optionsRef={optionsRef} />

        <div className={cx("message-wrapper")}>
          <div className={cx("message", "system")}>
            *This &lt;message&gt; increases the height of the &lt;message-wrapper&gt; to show the first
            &lt;message&gt;*
          </div>

          {messages.map((messageObj, index) => {
            const text = <span>{messageObj.message.trim()}</span>;
            const uniqueId = `unique-id-${uniqueIdRef.current}`;
            uniqueIdRef.current += 1;
            return (
              <div className={cx("message", messageObj.role)} key={index}>
                <HighlightedText id={uniqueId}>{text}</HighlightedText>
                <Speech {...config} id={uniqueId} text={text} highlightText={true} />
              </div>
            );
          })}

          <div className={cx("message", "system")}>
            *This &lt;message&gt; increases the height of the &lt;message-wrapper&gt; to show the last
            &lt;message&gt;*
          </div>
        </div>

        <div className={cx("liqid-glass", "at-options")}></div>
        <div className={cx("liqid-glass", "at-prompt")}></div>

        <div ref={promptWrapper} className={cx("prompt-wrapper")}>
          <textarea
            ref={textarea}
            name="prompt"
            placeholder="Ask anything..."
            rows={2}
            value={prompt}
            onChange={(event) => handleSetPrompt({ event })}
            onKeyDownCapture={handleSendPromptByEnter}></textarea>

          <div className={cx("icons")}>
            <FontAwesomeIcon
              icon={microIcon ? faMicrophone : faMicrophoneSlash}
              className={cx("icon")}
              onClick={handleRecording}
            />
            <FontAwesomeIcon
              icon={faArrowUp}
              ref={uploadRef}
              className={cx("icon")}
              onClick={handleSendPrompt}
            />
          </div>

          <input
            type="checkbox"
            value={isSpeak}
            onChange={() => setIsSpeak((prev) => !prev)}
            defaultChecked
          />
        </div>
      </div>

      <div className={cx("audio-store")}>
        {audioStoreRef.user?.map((audioURL, index) => (
          <audio src={audioURL} controls key={index} />
        ))}
      </div>
    </div>
  );
}

export default AIPage;
