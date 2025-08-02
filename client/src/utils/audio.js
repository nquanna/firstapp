import audioBufferToWav from "audiobuffer-to-wav";

let mediaRecorder;
let chunks = [];

async function audioConverter(webmBlob) {
  const audioContext = new window.AudioContext();
  const arrayBuffer = await webmBlob.arrayBuffer();
  const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);

  const wavBuffer = audioBufferToWav(audioBuffer);
  return new Blob([wavBuffer], { type: "audio/wav" });
}

const methods = {
  async start() {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    mediaRecorder = new MediaRecorder(stream);

    chunks = [];

    mediaRecorder.ondataavailable = (e) => {
      e.data.size && chunks.push(e.data); // thu từng đoạn âm thanh
    };

    mediaRecorder.start();
  },

  stop() {
    return new Promise(async (resolve) => {
      mediaRecorder.onstop = async () => {
        const webmBlob = new Blob(chunks, { type: "audio/webm" });
        const wavBlob = await audioConverter(webmBlob);
        // const audioURL = URL.createObjectURL(blob);

        resolve(wavBlob);
      };

      await mediaRecorder.stop();
    });
  },
};

async function audio(method) {
  return await methods[method]();
}

export { audioConverter };
export default audio;
