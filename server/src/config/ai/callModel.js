const { GoogleGenAI } = require("@google/genai");

const constanst = require("../../utils/constanst");

const AI = new GoogleGenAI({ apiKey: constanst.apiKey });

const systemRole = { role: "user", parts: [{ text: "" }] };
const contents = [systemRole];

const callModel = async ({ prompt, model, base64Audio, inputType = "text", outputType = "text" }) => {
  const newContent = { role: "user", parts: [{ text: prompt }] };

  inputType === "audio" &&
    newContent.parts.push({ inlineData: { mimeType: "audio/wav", data: base64Audio } });

  contents.push(newContent);

  const response = await AI.models.generateContent({
    model,
    generationConfig: {
      temperature: 0.5,
      maxOutputTokens: 70,
    },
    contents,
  });

  return response.text;
};

module.exports = callModel;
