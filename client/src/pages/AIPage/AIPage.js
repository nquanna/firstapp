import { useRef, useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMicrophone, faMicrophoneSlash, faArrowUp } from "@fortawesome/free-solid-svg-icons";

import classNames from "classnames/bind";

import { api } from "~/utils";

import { recognition, assignSetText, speech } from "~/utils";
import Message from "./Message";

import style from "./AIPage.module.scss";

const cx = classNames.bind(style);

function AIPage() {
  const [messages, setMessages] = useState([
    /* { role: "user", message: "hello" },
    { role: "ai", message: "helloco ncanditc onmem" },
    { role: "user", message: "hellosafhs efsjdfksdfj hsuofsklfjklsd fnsjklhf sjlfsklf" },
    { role: "ai", message: "helloc oncanditc onmema ycon emaybeo lamday conbamay" },
    { role: "user", message: "hellosafhsefsjdfksdfjhsuo fsklfjklsdfnsjklhfsjlfsklf" },
    { role: "ai", message: "helloconcanditcon memayconmemaybeolamdayco nbamay" },
    { role: "user", message: "hellosafhsefsjdfksdfjhsuofsklfjklsdfnsjklhfsjlfsklf" },
    { role: "ai", message: "helloconcanditconmemayc onmemaybeo lamdayconbamay" },
    { role: "user", message: "hellosa fhsefsjdfksdfjhsuofsklfjklsdfnsjklhfsjlfsklf" },
    { role: "ai", message: "helloconc anditc onmemayconmemaybeolamdayconbamay" },
    { role: "user", message: "hello safhsefsjdfksdfjhsuofsklf jk lsdfnsjklhfsjlfsklf" },
    { role: "ai", message: "helloconcanditc onmemaycon memaybeola mdayconbamay" },
    { role: "user", message: "hellos afhsefsjdfksdfjh suofs klfjklsdfnsjklhfsjlfsklf" },
    { role: "ai", message: "helloconcandit conm emayconmemaybe olamdayconbamay" },
    { role: "user", message: "hellosafhsefsjdfksdfjhsuofsklfjklsdfnsjklhfsjlfsklf" },
    { role: "ai", message: "helloconcanditco nmemayconmemaybeolamdayconbamay" },
    { role: "user", message: "hellosafhsefsjdfksdfjhsuofsklfjklsdfnsjklhfsjlfsklf" },
    { role: "ai", message: "helloconcanditconmemayconmemaybeolamdayconbamay" },
    { role: "user", message: "hellosafhsefsjdfksdfjhsuofsklfjklsdf nsjklhfsjlfsklf" },
    { role: "ai", message: "helloco ncanditconme mayconmemaybeola mdayconbamay" },
    { role: "user", message: "hellosa fhsefsjdfksdfjhsuofsklfjklsdfnsjklhfsjlfsklf" },
    { role: "ai", message: "hellocon canditconmemayconm emaybeolam dayconbamay" }, */
  ]);
  const [prompt, setPrompt] = useState("");
  const [microIcon, setMicroIcon] = useState(true);

  const [promptWrapper, textarea] = [useRef(), useRef()];

  useEffect(() => {
    promptWrapper.height = getComputedStyle(promptWrapper.current).height;
    document.documentElement.style.setProperty("--prompt-height", promptWrapper.height);

    assignSetText(handleSetPrompt);

    document.addEventListener("keydown", (e) => e.code === "Enter" && prompt && handleSendPrompt());
    // eslint-disable-next-line
  }, []);

  const handleSetPrompt = ({ event, finalText }) => {
    event && setPrompt(event.target.value);
    finalText && setPrompt((prev) => (prev += ` ${finalText}`));
  };

  const handleRecording = () => {
    microIcon ? recognition("start") : recognition("stop");
    setMicroIcon((prev) => !prev);
  };

  const handleSendPrompt = async () => {
    console.log(prompt);
    if (!prompt) return;

    setMessages((prev) => [...prev, { role: "user", message: prompt }]);
    setPrompt("");
    textarea.current.focus();

    const responseMessage = await api.request({ method: "post", path: "/ai/prompt", data: { prompt } });
    console.log("responseMessage:", responseMessage);

    if (!responseMessage.success) return;
    setMessages((prev) => [...prev, { role: "ai", message: responseMessage.message }]);

    speech(responseMessage.message);
  };

  return (
    <div className={cx("ai-wrapper")}>
      <div className={cx("message-wrapper")}>
        {messages.map((messageObj, index) => (
          <Message role={messageObj.role} message={messageObj.message.trim()} key={index} />
        ))}

        <Message
          role="system"
          message="*This <message> increases the height of the <message-wrapper> to show the last <message>*"
        />
      </div>

      <div className={cx("liqid-glass")}></div>

      <div ref={promptWrapper} className={cx("prompt-wrapper")}>
        <textarea
          ref={textarea}
          name="prompt"
          placeholder="Ask anything..."
          rows={2}
          value={prompt}
          onChange={(event) => handleSetPrompt({ event })}></textarea>

        <div className={cx("icons")}>
          <FontAwesomeIcon
            icon={microIcon ? faMicrophone : faMicrophoneSlash}
            className={cx("icon")}
            onClick={handleRecording}
          />
          <FontAwesomeIcon icon={faArrowUp} className={cx("icon")} onClick={handleSendPrompt} />
        </div>
      </div>
    </div>
  );
}

export default AIPage;
