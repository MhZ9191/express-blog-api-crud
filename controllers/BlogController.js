const postsData = require("../data/blogsData");

function index(req, res) {
  res.json({
    message: "Visualizza tutti gli elementi",
    result: postsData,
    success: true,
  });
}

function show(req, res) {
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
}

function store(req, res) {
  res.json({
    message: "Creo un nuovo elemento",
    success: true,
  });
}

function update(req, res) {
  res.json({
    message: "Modifico interamente un elemento",
    success: true,
  });
}

function modify(req, res) {
  res.json({
    message: "Modifico parzialmente un elemento",
    success: true,
  });
}

function destroy(req, res) {
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
}

module.exports = { index, show, store, update, modify, destroy };
