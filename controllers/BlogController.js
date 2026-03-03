const postsData = require("../data/blogsData");

function index(req, res) {
  res.json({
    message: "Visualizza tutti gli elementi",
    result: postsData,
    success: true,
  });
}

module.exports = { index };
