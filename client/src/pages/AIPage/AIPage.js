/* import { useRef, useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMicrophone, faMicrophoneSlash, faArrowUp } from "@fortawesome/free-solid-svg-icons";

import classNames from "classnames/bind";

import { api } from "~/utils";

import { recognition, assignSetText, audio, speech } from "~/utils";

import style from "./AIPage.module.scss";

const cx = classNames.bind(style);

function AIPage() {
  const [messages, setMessages] = useState([
  ]);
  const [prompt, setPrompt] = useState("");
  const [model, setModel] = useState("gemini-2.0-flash");
  const [inputType, setInputType] = useState("audio");
  const [outputType, setOutputType] = useState("audio");
  const [microIcon, setMicroIcon] = useState(true);
  const [speak, setSpeak] = useState(true);

  const audioRef = useRef();
  const [options, promptWrapper, textarea] = [useRef(), useRef(), useRef()];
  const uploadRef = useRef();

  useEffect(() => {
    promptWrapper.height = getComputedStyle(promptWrapper.current).height;
    document.documentElement.style.setProperty("--prompt-height", promptWrapper.height);

    options.height = getComputedStyle(options.current).height;
    document.documentElement.style.setProperty("--options-height", options.height);
    assignSetText(handleSetPrompt);

    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    uploadRef.current.classList.toggle(cx("disable"), !audioRef.wavBlob);
  }, [audioRef.wavBlob]);

  const handleSetPrompt = ({ event, audioText }) => {
    event && setPrompt(event.target.value);
    audioText && setPrompt((prev) => (prev += ` ${audioText}`));
  };

  const handleRecording = async () => {
    if (inputType === "text") {
      microIcon ? recognition("start") : recognition("stop");
    } else {
      if (microIcon) {
        await audio("start");
      } else {
        audioRef.wavBlob = await audio("stop");
        alert("saved audio.");
      }
    }
    setMicroIcon((prev) => !prev);
  };

  const handleSendPrompt = async () => {
    console.log("prompt:", prompt.trim());
    if (!prompt.trim() && !audioRef.wavBlob) return;

    if (audioRef.wavBlob) {
      !prompt.trim() &&
        setMessages((prev) => [...prev, { role: "user", message: "*this is audio file*" }]);
      prompt.trim() &&
        setMessages((prev) => [...prev, { role: "user", message: `*this is audio file* ${prompt}` }]);
    } else setMessages((prev) => [...prev, { role: "user", message: prompt }]);

    setPrompt("");
    textarea.current.focus();

    const formData = new FormData();
    formData.append("prompt", prompt);
    formData.append("outputType", outputType);
    formData.append("model", model);
    audioRef.wavBlob && formData.append("audio", audioRef.wavBlob, "audio.wav");

    const responseMessage = await api.request({
      method: "post",
      path: "/ai/call-api",
      data: formData,
    });

    if (!responseMessage.success) return;
    setMessages((prev) => [...prev, { role: "ai", message: responseMessage.message }]);
    audioRef.wavBlob = null;
    speak && speech(responseMessage.message);
  };

  const handleSendPromptByEnter = (event) => {
    if (event.code !== "Enter") return;
    if (event.shiftKey) return;

    event.preventDefault();
    handleSendPrompt();
  };

  return (
    <div className={cx("ai-wrapper")}>
      <div ref={options} className={cx("options-wrapper")}>
        <select defaultValue={inputType} onChange={(event) => setInputType(event.target.value)}>
          <option value="text">Speech to text</option>
          <option value="audio">Audio</option>
        </select>{" "}
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

        {messages.map((messageObj, index) => (
          <div className={cx("message", messageObj.role)} key={index}>
            {messageObj.message.trim()}
          </div>
        ))}

        {
          <div className={cx("message", "system")}>
            *This &lt;message&gt; increases the height of the &lt;message-wrapper&gt; to show the last
            &lt;message&gt;*
          </div>
        }
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
            className={cx("icon", { disable: !prompt.trim() })}
            onClick={handleSendPrompt}
          />
        </div>

        <input type="checkbox" value={speak} onChange={() => setSpeak((prev) => !prev)} defaultChecked />
      </div>
    </div>
  );
}

export default AIPage; */

import { useRef, useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMicrophone, faMicrophoneSlash, faArrowUp } from "@fortawesome/free-solid-svg-icons";
import classNames from "classnames/bind";

import { api, recognition, assignSetText, audio, speech } from "~/utils";
import style from "./AIPage.module.scss";

const cx = classNames.bind(style);

function AIPage() {
  const [messages, setMessages] = useState([]);
  const [prompt, setPrompt] = useState("");
  const [model, setModel] = useState("gemini-2.0-flash");
  const [inputType, setInputType] = useState("audio");
  const [outputType, setOutputType] = useState("audio");
  const [microIcon, setMicroIcon] = useState(true);
  const [speak, setSpeak] = useState(true);

  const audioRef = useRef();
  const [optionsRef, promptWrapperRef, textareaRef] = [useRef(), useRef(), useRef()];
  const uploadRef = useRef();

  useEffect(() => {
    const promptHeight = getComputedStyle(promptWrapperRef.current).height;
    const optionsHeight = getComputedStyle(optionsRef.current).height;
    document.documentElement.style.setProperty("--prompt-height", promptHeight);
    document.documentElement.style.setProperty("--options-height", optionsHeight);
    assignSetText(handleSetPrompt);
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    uploadRef.current.classList.toggle(cx("disable"), !audioRef.wavBlob);
  }, [audioRef.wavBlob]);

  const handleSetPrompt = ({ event, audioText }) => {
    if (event) setPrompt(event.target.value);
    if (audioText) setPrompt((prev) => `${prev} ${audioText}`);
  };

  const handleRecording = async () => {
    if (inputType === "text") {
      microIcon ? recognition("start") : recognition("stop");
    } else {
      if (microIcon) {
        await audio("start");
      } else {
        audioRef.wavBlob = await audio("stop");
        alert("saved audio.");
      }
    }
    setMicroIcon((prev) => !prev);
  };

  const handleSendPrompt = async () => {
    const trimmed = prompt.trim();
    if (!trimmed && !audioRef.wavBlob) return;

    const userMsg = audioRef.wavBlob ? `*this is audio file*${trimmed ? " " + trimmed : ""}` : trimmed;

    setMessages((prev) => [...prev, { role: "user", message: userMsg }]);
    setPrompt("");
    textareaRef.current.focus();

    const formData = new FormData();
    formData.append("prompt", prompt);
    formData.append("outputType", outputType);
    formData.append("model", model);
    if (audioRef.wavBlob) formData.append("audio", audioRef.wavBlob, "audio.wav");

    const res = await api.request({
      method: "post",
      path: "/ai/call-api",
      data: formData,
    });

    if (!res.success) return;
    setMessages((prev) => [...prev, { role: "ai", message: res.message }]);
    audioRef.wavBlob = null;
    speak && speech(res.message);
  };

  const handleSendPromptByEnter = (e) => {
    if (e.code === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendPrompt();
    }
  };

  return (
    <div className={cx("ai-wrapper")}>
      <div ref={optionsRef} className={cx("options-wrapper")}>
        <select defaultValue={inputType} onChange={(e) => setInputType(e.target.value)}>
          <option value="text">Speech to text</option>
          <option value="audio">Audio</option>
        </select>
        <select defaultValue={outputType} onChange={(e) => setOutputType(e.target.value)}>
          <option value="text">Text</option>
          <option value="audio">Audio</option>
        </select>
        <select defaultValue={model} onChange={(e) => setModel(e.target.value)}>
          <option value="gemini-2.0-flash">Gemini-2.0-flash</option>
          <option value="gemini-2.5-flash">Gemini-2.5-flash</option>
        </select>
      </div>

      <div className={cx("message-wrapper")}>
        <div className={cx("message", "system")}>
          *This &lt;message&gt; increases the height of the &lt;message-wrapper&gt; to show the first
          message*
        </div>
        {messages.map(({ role, message }, i) => (
          <div className={cx("message", role)} key={i}>
            {message.trim()}
          </div>
        ))}
        <div className={cx("message", "system")}>
          *This &lt;message&gt; increases the height of the &lt;message-wrapper&gt; to show the last
          message*
        </div>
      </div>

      <div className={cx("liqid-glass", "at-options")} />
      <div className={cx("liqid-glass", "at-prompt")} />

      <div ref={promptWrapperRef} className={cx("prompt-wrapper")}>
        <textarea
          ref={textareaRef}
          name="prompt"
          placeholder="Ask anything..."
          rows={2}
          value={prompt}
          onChange={(e) => handleSetPrompt({ event: e })}
          onKeyDownCapture={handleSendPromptByEnter}
        />
        <div className={cx("icons")}>
          <FontAwesomeIcon
            icon={microIcon ? faMicrophone : faMicrophoneSlash}
            className={cx("icon")}
            onClick={handleRecording}
          />
          <FontAwesomeIcon
            icon={faArrowUp}
            ref={uploadRef}
            className={cx("icon", { disable: !prompt.trim() })}
            onClick={handleSendPrompt}
          />
        </div>
        <input type="checkbox" checked={speak} onChange={() => setSpeak((p) => !p)} />
      </div>
    </div>
  );
}

export default AIPage;
