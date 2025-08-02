const recording = new window.webkitSpeechRecognition() || new window.SpeechRecognition();
recording.continuous = true;
recording.interimResults = false;

const finalResult = [];
let isListening = false;
let setFinalResult;

recording.onstart = () => {
  // alert(isListening);
};

recording.onend = () => {
  // alert("end and", isListening);
  isListening && recording.start();

  setFinalResult({ audioText: finalResult.join(" ") });
  finalResult.length = 0;
};

recording.onerror = (event) => {
  console.log("Error: ", event.error);
  alert(event.error);
};

function assignSetText(setText) {
  recording.onresult = (event) => {
    isListening && recording.stop();
    finalResult.push(event.results[0][0].transcript);
  };
  setFinalResult = setText;
}

function recognition(method, lang = "en-GB") {
  isListening = method === "start";

  recording.lang = lang;
  recording[method]();
}

export { assignSetText };
export default recognition;
