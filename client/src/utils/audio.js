let mediaRecorder;
let chunks = [];

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
    return new Promise((resolve) => {
      mediaRecorder.onstop = async () => {
        const blob = new Blob(chunks, { type: "audio/webm" });
        // const audioURL = URL.createObjectURL(blob);
        resolve(blob);
      };

      mediaRecorder.stop();
    });
  },
};

async function audio(method) {
  return await methods[method]();
}

export default audio;
