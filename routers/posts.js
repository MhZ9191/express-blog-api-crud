const postsData = require("../data/blogsData");
const express = require("express");
const posts = express();

//! Index
posts.get("/", (req, res) => {
  res.json({
    message: "Visualizza tutti gli elementi",
    result: postsData,
    success: true,
  });
});

//! Show
posts.get("/:id", (req, res) => {
  const searcheditem = postsData.find(
    (el) => el.id === parseInt(req.params.id),
  );

  if (!searcheditem) {
    return res.status(404).json({
      message: "elemento non trovato",
      success: false,
    });
  }

  res.json({
    message: "Visualizza un singolo elemento",
    result: searcheditem,
    success: true,
  });
});

//! Store
posts.post("/", (req, res) => {
  res.json({
    message: "Creo un nuovo elemento",
    success: true,
  });
});

//! Update
posts.put("/:id", (req, res) => {
  res.json({
    message: "Modifico interamente un elemento",
    success: true,
  });
});

//! Modify
posts.patch("/:id", (req, res) => {
  res.json({
    message: "Modifico parzialmente un elemento",
    success: true,
  });
});

//! Destroy
posts.delete("/:id", (req, res) => {
  const indexitem = postsData.findIndex(
    (el) => el.id === parseInt(req.params.id),
  );

  if (indexitem === -1) {
    return res.status(404).json({
      message: "Elemento non trovato",
      success: false,
    });
  }

  const tmpElement = postsData[indexitem];
  postsData.splice(indexitem, 1);
  console.log(postsData);
  res.json({
    messagge: "Elemento eliminato",
    result: tmpElement,
    success: true,
  });
});

module.exports = posts;
