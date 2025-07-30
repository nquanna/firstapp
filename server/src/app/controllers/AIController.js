const callAPI = require("../../config/ai/callApi");

const audioConverter = require("../../utils/audioConverter");

class AuthController {
  // [POST] /ai/call-api
  async callApi(req, res) {
    try {
      const { prompt, model, outputType } = req.body;
      // console.log(prompt, model, outputType);

      let responseMessage;
      if (req.file) {
        const base64Audio = await audioConverter(req.file);
        responseMessage = await callAPI({
          prompt,
          model,
          base64Audio,
          inputType: "audio",
          outputType,
        });
      } else responseMessage = await callAPI({ prompt, model, outputType });

      return res.json({ success: true, message: responseMessage });
    } catch (error) {
      console.log(error);
      console.log(error.toString());
      res.status(500).json({ success: false, message: "Internal Server Error!" });
    }
  }
}

module.exports = new AuthController();
