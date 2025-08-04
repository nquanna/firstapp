import audioBufferToWav from "audiobuffer-to-wav";

const utils = {
  base64ToBlob(base64Audio, options = {}) {
    const sampleRate = options.sampleRate || 24000;
    const numChannels = options.numChannels || 1;
    const bytesPerSample = 2;

    const rawData = atob(base64Audio);
    const dataLength = rawData.length;
    const buffer = new ArrayBuffer(44 + dataLength);
    const view = new DataView(buffer);

    // WAV header
    const writeString = (offset, str) => {
      for (let i = 0; i < str.length; i++) {
        view.setUint8(offset + i, str.charCodeAt(i));
      }
    };

    writeString(0, "RIFF");
    view.setUint32(4, 36 + dataLength, true); // Chunk size
    writeString(8, "WAVE");
    writeString(12, "fmt ");
    view.setUint32(16, 16, true); // Subchunk1Size (PCM)
    view.setUint16(20, 1, true); // AudioFormat = PCM
    view.setUint16(22, numChannels, true);
    view.setUint32(24, sampleRate, true);
    view.setUint32(28, sampleRate * numChannels * bytesPerSample, true); // ByteRate
    view.setUint16(32, numChannels * bytesPerSample, true); // BlockAlign
    view.setUint16(34, 8 * bytesPerSample, true); // BitsPerSample
    writeString(36, "data");
    view.setUint32(40, dataLength, true);

    // PCM data
    for (let i = 0; i < dataLength; i++) {
      view.setUint8(44 + i, rawData.charCodeAt(i));
    }

    return URL.createObjectURL(new Blob([view], { type: "audio/wav" }));
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
