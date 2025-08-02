import { useRef, useEffect, useState } from "react";
import Speech, { useSpeak, HighlightedText } from "react-text-to-speech";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMicrophone, faMicrophoneSlash, faArrowUp } from "@fortawesome/free-solid-svg-icons";

import classNames from "classnames/bind";

import { api, recognition, assignSetText, audio } from "~/utils";

import SpeechConfig from "./SpeechConfig";

import style from "./AIPage.module.scss";

const cx = classNames.bind(style);

function AIPage() {
  const [messages, setMessages] = useState([]);
  const [prompt, setPrompt] = useState("");
  const [inputType, setInputType] = useState("audio");
  const [model, setModel] = useState("gemini-2.0-flash");
  const [outputType, setOutputType] = useState("audio");
  const [microIcon, setMicroIcon] = useState(true);
  const [isSpeak, setIsSpeak] = useState(true);
  const [config, setConfig] = useState();

  const uniqueIdRef = useRef(-1);
  const audioStore = useRef();
  const [options, promptWrapper, textarea] = [useRef(), useRef(), useRef()];
  const uploadRef = useRef();

  const { speak } = useSpeak();

  useEffect(() => {
    // initial
    promptWrapper.height = getComputedStyle(promptWrapper.current).height;
    document.documentElement.style.setProperty("--prompt-height", promptWrapper.height);

    options.height = getComputedStyle(options.current).height;
    document.documentElement.style.setProperty("--options-height", options.height);

    audioStore.user = [];
    audioStore.ai = [];

    assignSetText(handleSetPrompt);

    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    inputType === "text" && recognition("stop");
  }, [inputType]);

  useEffect(() => {
    uploadRef.current.classList.toggle(cx("disable"), !audioStore.audio && !prompt.trim());
  }, [audioStore.audio, prompt]);

  const handleSetPrompt = ({ event, audioText }) => {
    event && setPrompt(event.target.value);
    audioText && setPrompt((prev) => `${prev ? prev : ""} ${audioText}`.trim());
  };

  const handleRecording = async () => {
    if (inputType === "text") microIcon ? recognition("start") : recognition("stop");
    else {
      if (microIcon) await audio("start");
      else {
        audioStore.audio = await audio("stop");
        audioStore.user.push(URL.createObjectURL(audioStore.audio));
      }
    }
    setMicroIcon((prev) => !prev);
  };

  const handleSendPrompt = async () => {
    console.log("prompt:", prompt.trim());
    if (!prompt.trim() && !audioStore.audio) return;

    const newMessage = `${audioStore.audio ? "*this is audio file*" : ""} ${prompt.trim() && prompt}`;
    setMessages((prev) => [...prev, { role: "user", message: newMessage.trim() }]);

    setPrompt("");

    const formData = new FormData();
    formData.append("prompt", prompt);
    formData.append("outputType", outputType);
    formData.append("model", model);
    audioStore.audio && formData.append("audio", audioStore.audio, "audio.wav");
    audioStore.audio = null;

    const responseMessage = await api.request({
      method: "post",
      path: "/ai/call-api",
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
        {audioStore.ai?.map((audioURL, index) => (
          <audio src={audioURL} controls key={index} />
        ))}
      </div>

      <div className={cx("ai-interactive")}>
        <div ref={options} className={cx("options-wrapper")}>
          <select defaultValue={inputType} onChange={(event) => setInputType(event.target.value)}>
            <option value="text">Speech to text</option>
            <option value="audio">Audio</option>
          </select>
          <select defaultValue={outputType} onChange={(event) => setOutputType(event.target.value)}>
            <option value="text">Text</option>
            <option value="audio">Audio</option>
          </select>
          <select name="model" defaultValue={model} onChange={setModel}>
            <option value="gemini-2.0-flash">Gemini-2.0-flash</option>
            <option value="gemini-2.5-flash">Gemini-2.5-flash</option>
          </select>
        </div>

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
        {audioStore.user?.map((audioURL, index) => (
          <audio src={audioURL} controls key={index} />
        ))}
      </div>
    </div>
  );
}

export default AIPage;
