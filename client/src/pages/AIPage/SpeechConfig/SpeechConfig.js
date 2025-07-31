import { useRef, useEffect } from "react";

function SpeechConfig() {
  const langAndVoice = useRef();

  useEffect(() => {
    langAndVoice.en = {
      david: "Microsoft David - English (United States)",
      mark: "Microsoft Mark - English (United States)",
      zira: "Microsoft Zira - English (United States)",
      google: "Google US English",
    };
    langAndVoice.vi = {
      an: "Microsoft An - Vietnamese (Vietnam)",
    };
  }, []);

  return (
    <>
      <div></div>
    </>
  );
}

export default SpeechConfig;
