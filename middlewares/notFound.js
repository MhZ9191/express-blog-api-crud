function notFound(req, res, next) {
  res.status(404).json({
    message: "Not found",
    success: false,
  });
}
module.exports = notFound;
