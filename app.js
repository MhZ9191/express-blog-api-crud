console.log("Hello", process.env.username);

const express = require("express");
const app = express();
const port = 3000;
const appUrl = `http://127.0.0.1:${port}`;
const errorsHandlers = require("./middlewares/errorsHandler");
const notFound = require("./middlewares/notFound");
const posts = require("./routers/posts");

app.use(express.static("public"));
app.use(express.json());
app.use("/posts", posts);
app.get("/", (req, res) => {
  res.json({
    message: "Welcome!",
  });
});

app.use(notFound);
app.use(errorsHandlers);
app.listen(port, () => {
  console.log("Listen on", appUrl);
});
