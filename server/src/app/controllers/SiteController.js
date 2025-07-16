class SiteController {
  // [GET] /
  index(req, res, next) {
    console.log(req.method);
    res.json({ success: true, message: "this home" });
  }
}

module.exports = new SiteController();
