const express = require("express");
const posts = express();
const blogController = require("../controllers/BlogController");

posts.get("/", blogController.index);
posts.get("/:id", blogController.show);
posts.post("/", blogController.store);
posts.put("/:id", blogController.update);
posts.patch("/:id", blogController.modify);
posts.delete("/:id", blogController.destroy);

module.exports = posts;
