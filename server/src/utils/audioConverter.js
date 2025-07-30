const ffmpeg = require("fluent-ffmpeg");
const ffmpegPath = require("ffmpeg-static");
const streamifier = require("streamifier");
const { Writable } = require("stream");

ffmpeg.setFfmpegPath(ffmpegPath);

const audioConverter = async (audioFile) => {
  const fileBuffer = audioFile.buffer;
  const inputStream = streamifier.createReadStream(fileBuffer);
  const outputChunks = [];

  const writableStream = new Writable({
    write(chunk, encoding, callback) {
      outputChunks.push(chunk);
      callback();
    },
  });

  return new Promise((resolve, reject) => {
    ffmpeg(inputStream)
      .toFormat("wav")
      .on("error", (err) => {
        console.error("FFmpeg error:", err);
        reject("Conversion error");
      })
      .on("end", () => {
        const outputBuffer = Buffer.concat(outputChunks);
        const base64 = outputBuffer.toString("base64");
        resolve(base64);
      })
      .pipe(writableStream, { end: true });
  });
};

module.exports = audioConverter;
