class SiteController {
  // [GET] /
  index(req, res, next) {
    res.json({ success: true, message: "this home" });
  }
}

module.exports = new SiteController();
