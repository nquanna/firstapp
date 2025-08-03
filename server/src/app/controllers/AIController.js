const { GoogleGenAI } = require("@google/genai");

const constanst = require("../../utils/constanst");
const trainingContents = require("../../training.json")?.ai?.contents || "";
const trainingContent = trainingContents?.reduce((final, content) => (final += content)) || "";

const AI = new GoogleGenAI({ apiKey: constanst.apiKey });

const noneTraining = { role: "user", parts: [{ text: "" }] };
const systemTraining = { role: "user", parts: [{ text: trainingContent }] };
const contents = [];

const modelTTS = {
  flash: "gemini-2.5-flash-preview-tts",
  pro: "gemini-2.5-pro-preview-tts",
};

class AIController {
  // [POST] /ai/call-model
  async callModel(req, res) {
    try {
      const { useTraining, prompt, outputType, model } = req.body;
      // console.log(prompt, outputType, model);

      contents[0] = +useTraining ? systemTraining : noneTraining;

      const newContent = { role: "user", parts: [{ text: prompt }] };
      if (req.file) {
        const base64Audio = await req.file.buffer.toString("base64");
        newContent.parts.push({ inlineData: { mimeType: "audio/wav", data: base64Audio } });
      }
      contents.push(newContent);

      const { text: message } = await AI.models.generateContent({
        model,
        generationConfig: {
          temperature: 0.5,
          maxOutputTokens: 30,
        },
        contents,
      });

      let resBase64Audio;
      if (outputType === "audio") {
        const responseAudio = await AI.models.generateContent({
          model: modelTTS.flash,
          contents: [{ parts: [{ text: message }] }],
          config: {
            responseModalities: ["AUDIO"],
            speechConfig: {
              voiceConfig: {
                prebuiltVoiceConfig: { voiceName: "Kore" },
              },
            },
          },
        });
        resBase64Audio = responseAudio.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
      }

      contents.push({ role: "model", parts: [{ text: message }] });

      return res.json({ success: true, message, resBase64Audio });
    } catch (error) {
      console.log(error);
      console.log(error.toString());
      res.status(500).json({ success: false, message: "Internal Server Error!" });
    }
  }

  // [POST] /ai/remove-cache
  async removeCache(req, res) {
    try {
      contents.length = 1;
      contents[0] = systemTraining;

      return res.json({ success: true, message: "Removed!!" });
    } catch (error) {
      console.log(error);
      console.log(error.toString());
      res.status(500).json({ success: false, message: "Internal Server Error!" });
    }
  }
}

module.exports = new AIController();
