function errorsHandlers(err, req, res, next) {
  console.log(err.message);
  res.status(500).json({
    message: "Internal server error",
    success: false,
  });
}

module.exports = errorsHandlers;
