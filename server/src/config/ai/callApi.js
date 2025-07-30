const { GoogleGenAI } = require("@google/genai");

const constanst = require("../../utils/constanst");

const AI = new GoogleGenAI({ apiKey: constanst.apiKey });

const systemRole = { role: "user", parts: [{ text: "" }] };
const contents = [systemRole];

const callApi = async ({ prompt, model, base64Audio, inputType = "text", outputType = "text" }) => {
  if (inputType === "audio") {
    contents.push({
      role: "user",
      parts: [{ text: prompt }, { inlineData: { mimeType: "audio/wav", data: base64Audio } }],
    });
  } else {
    contents.push({ role: "user", parts: [{ text: prompt }] });
  }

  const response = await AI.models.generateContent({
    model,
    config: {
      temperature: 0.8,
      // maxOutputTokens: 75,
    },
    contents,
  });
  // console.log(response.text);

  return response.text;
};

module.exports = callApi;
