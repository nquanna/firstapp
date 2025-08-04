const { GoogleGenAI } = require("@google/genai");

const constanst = require("../../utils/constanst");

const AI = new GoogleGenAI({ apiKey: constanst.apiKey });

const contents = [];

const modelTTS = {
  flash: "gemini-2.5-flash-preview-tts",
  pro: "gemini-2.5-pro-preview-tts",
};

class AIController {
  // [POST] /ai/call-model
  async callModel(req, res) {
    try {
      const { useTraining, trainingContent, prompt, outputType, model } = req.body;
      // console.log(prompt, outputType, model);

      const systemTraining = {
        role: "user",
        parts: [{ text: useTraining === "true" ? trainingContent : "" }],
      };
      contents[0] = systemTraining;

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

      console.log(message);

      let resBase64Audio;
      if (outputType === "audio") {
        const responseAudio = await AI.models.generateContent({
          model: modelTTS.flash,
          contents: [{ parts: [{ text: message }] }],
          config: {
            responseModalities: ["AUDIO"],
            speechConfig: {
              voiceConfig: {
                prebuiltVoiceConfig: { voiceName: "Iapetus" },
              },
            },
          },
        });
        resBase64Audio = responseAudio.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
      }

      // don't need push audio response because audio content === message
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
      contents.length = 0;
      console.log("removed cache!");

      return res.json({ success: true, message: "Removed!!" });
    } catch (error) {
      console.log(error);
      console.log(error.toString());
      res.status(500).json({ success: false, message: "Internal Server Error!" });
    }
  }
}

module.exports = new AIController();
