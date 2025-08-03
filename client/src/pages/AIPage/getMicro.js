import audioBufferToWav from "audiobuffer-to-wav";

const utils = {
  base64ToBlob(base64, contentType = "audio/wav", sliceSize = 512) {
    const byteCharacters = atob(base64);
    const byteArrays = [];

    for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
      const slice = byteCharacters.slice(offset, offset + sliceSize);

      const byteNumbers = new Array(slice.length);
      for (let i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }

      const byteArray = new Uint8Array(byteNumbers);
      byteArrays.push(byteArray);
    }

    const blob = new Blob(byteArrays, { type: contentType });
    return blob;
  },
};

const recognitionMethods = {
  recording: new window.webkitSpeechRecognition() || new window.SpeechRecognition(),
  finalResult: [],
  isListening: false,
  setFinalResult() {},

  init() {
    this.recording.continuous = true;
    this.recording.interimResults = false;

    this.recording.onend = () => {
      this.isListening && this.recording.start();

      this.setFinalResult({ audioText: this.finalResult.join(" ") });
      this.finalResult.length = 0;
    };

    this.recording.onerror = (event) => {
      console.log("Error: ", event.error);
      alert(event.error);
    };
  },

  assignSetText({ setPrompt }) {
    this.recording.onresult = (event) => {
      this.isListening && this.recording.stop();
      this.finalResult.push(event.results[0][0].transcript);
    };
    this.setFinalResult = setPrompt;
  },

  start({ lang = "en-GB" }) {
    this.isListening = true;

    this.recording.lang = lang;
    this.recording.abort();
    this.recording.start();
  },
  stop({ lang = "en-GB" }) {
    this.isListening = false;

    this.recording.lang = lang;
    this.recording.stop();
  },
};

const audioMethods = {
  stream: null,
  mediaRecorder: null,
  chunks: [],

  async audioConverter(webmBlob) {
    const audioContext = new window.AudioContext();
    const arrayBuffer = await webmBlob.arrayBuffer();
    const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);

    const wavBuffer = audioBufferToWav(audioBuffer);
    return new Blob([wavBuffer], { type: "audio/wav" });
  },

  async start() {
    this.stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    this.mediaRecorder = new MediaRecorder(this.stream);
    this.chunks = [];

    this.mediaRecorder.ondataavailable = (e) => {
      e.data.size && this.chunks.push(e.data); // thu từng đoạn âm thanh
    };

    this.mediaRecorder.start();
  },

  stop() {
    return new Promise(async (resolve) => {
      this.mediaRecorder.onstop = async () => {
        const webmBlob = new Blob(this.chunks, { type: "audio/webm" });
        const wavBlob = await this.audioConverter(webmBlob);

        resolve(wavBlob);
      };

      await this.mediaRecorder.stop();
      this.stream.getTracks().forEach((track) => track.stop());
      this.stream = null;
    });
  },
};

async function getMicro({ inputType, method, setPrompt, lang }) {
  if (inputType === "text") await recognitionMethods[method]({ setPrompt, lang });
  else if (inputType === "audio") return await audioMethods[method]();
  else alert("Invalid input type!");
}

export { utils };
export default getMicro;
