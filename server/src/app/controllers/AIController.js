const callAPI = require("../../config/ai/callApi");

class AuthController {
  // [POST] /ai/call-api
  async callApi(req, res) {
    try {
      const { prompt, outputType, model } = req.body;
      // console.log(prompt, outputType, model);

      let responseMessage;
      if (req.file) {
        const base64Audio = req.file.buffer.toString("base64");
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
