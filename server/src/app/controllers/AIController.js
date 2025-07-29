const connect = require("../../config/ai/connect");

class AuthController {
  // [POST] /ai/prompt
  async callApi(req, res) {
    try {
      const responseMessage = await connect(req.body.prompt);
      res.json({ success: true, message: responseMessage });
    } catch {
      res.status(500).json({ success: false, message: "Internal Server Error!" });
    }
  }
}

module.exports = new AuthController();
