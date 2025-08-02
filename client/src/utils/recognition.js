const recording = new window.webkitSpeechRecognition() || new window.SpeechRecognition();
recording.lang = "en-GB";
recording.continuous = true;
recording.interimResults = false;

const finalResult = [];
let isListening = false;
let setFinalResult;

recording.onstart = () => {
  alert("start listen to convert to text!");
};

recording.onend = () => {
  if (isListening) return recording.start();

  console.log(finalResult.join(" "));
  setFinalResult({ audioText: finalResult.join(" ") });
  finalResult.length = 0;
};

recording.onerror = (e) => {
  console.log("Error: ", e.error);
};

function assignSetText(setText) {
  recording.onresult = (event) => {
    isListening && recording.stop();
    finalResult.push(event.results[0][0].transcript);
  };
  setFinalResult = setText;
}

function recognition(method) {
  isListening = method === "start";
  recording[method]();
}

export { assignSetText };
export default recognition;
