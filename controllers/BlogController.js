const postsData = require("../data/blogsData");

function index(req, res) {
  const searchQuery = req.query.search;

  if (!searchQuery) {
    return res.json({
      message: "Visualizzo tutti gli elementi",
      result: postsData,
      success: true,
    });
  }

  const parseSearch = searchQuery.toLowerCase().trim();
  const searchFilter = postsData.filter((el) => {
    if (
      el.title.toLowerCase().trim().includes(parseSearch) ||
      el.tags.some((ele) => ele.toLowerCase().trim().includes(parseSearch))
    ) {
      return true;
    }
    return false;
  });

  res.json({
    message:
      searchFilter.length > 0
        ? "Risultati filtrati"
        : "Risultati non trovati, visualizzo tutti gli elementi",
    result: searchFilter.length > 0 ? searchFilter : postsData,
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
  const bodyReq = req.body;
  if (!bodyReq) {
    return res.status(400).json({
      error: "Bad Request",
      message: "Il server non può elaborare la richiesta del client",
      success: false,
    });
  }
  const { title, content, image, tags } = req.body;
  const resultValidation = validateDataReq(bodyReq);
  if (!resultValidation.success) {
    return res.status(400).json({
      error: "Error",
      message: resultValidation.message,
      success: false,
    });
  }

  const validId =
    postsData.reduce((acc, ce) => (acc.id < ce.id ? ce : acc)).id + 1;

  const newObject = {
    id: validId,
    title,
    content,
    image,
    tags,
  };

  postsData.push(newObject);

  res.status(201).json({
    message: resultValidation.message,
    result: newObject,
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
  res.status(204).json({
    messagge: "Elemento eliminato",
    result: tmpElement,
    success: true,
  });
}

function validateDataReq(req) {
  const { title, content, image, tags } = req;

  if (typeof title != "string" || !title.trim()) {
    return {
      message: "Campo title non valido",
      success: false,
    };
  }

  const duplicateTitle = postsData.some(
    (el) => el.title.toLowerCase().trim() === title.toLowerCase().trim(),
  );

  if (duplicateTitle) {
    return {
      message: "Titolo già esistente",
      success: false,
    };
  }

  if (typeof content != "string" || !content.trim()) {
    return {
      message: "Campo content non valido",
      success: false,
    };
  }

  if (typeof image != "string" || !image.trim()) {
    return {
      message: "Campo image non valido",
      success: false,
    };
  }

  if (!tags || !Array.isArray(tags)) {
    return {
      message: "Campo tags non valido",
      success: false,
    };
  }

  for (const el of tags) {
    if (typeof el !== "string" || el.trim().length === 0) {
      return {
        message: "Campi tag non validi",
        success: false,
      };
    }
  }

  return {
    message: "Campi inseiti validi",
    success: true,
  };
}

module.exports = { index, show, store, update, modify, destroy };
