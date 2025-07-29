const OpenAI = require("openai");

const constanst = require("../../utils/constanst");

const openai = new OpenAI({
  baseURL: constanst.baseURL,
  apiKey: constanst.apiKey,
});

const messages = [{ role: "system", content: "You are a helpful assistant." }];

const connect = async (prompt) => {
  messages.push({ role: "user", content: prompt });

  const response = await openai.chat.completions.create({
    model: "gemini-2.0-flash",
    temperature: 0.7,
    max_tokens: 100,
    messages,
  });

  const responseMessage = response.choices[0].message.content;
  messages.push({ role: "assistant", content: responseMessage });

  return responseMessage;
};

module.exports = connect;
