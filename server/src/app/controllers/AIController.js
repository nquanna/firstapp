const callModel = require("../../config/ai/callModel");

class AIController {
  // [POST] /ai/call-model
  async callModel(req, res) {
    try {
      const { prompt, outputType, model } = req.body;
      // console.log(prompt, outputType, model);

      let params = { prompt, model, outputType };

      if (req.file) {
        const base64Audio = await req.file.buffer.toString("base64");
        params = { ...params, prompt, model, outputType, base64Audio, inputType: "audio" };
      }

      const responseMessage = await callModel(params);

      return res.json({ success: true, message: responseMessage });
    } catch (error) {
      console.log(error);
      console.log(error.toString());
      res.status(500).json({ success: false, message: "Internal Server Error!" });
    }
  }
}

module.exports = new AIController();
