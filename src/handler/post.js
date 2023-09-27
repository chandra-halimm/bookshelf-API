const books = require("../books");
const { nanoid } = require("nanoid");
const postDataBooks = (request, h) => {
  const createdAt = new Date().toISOString;
  const updateAt = createdAt;
  const id = nanoid(16);

  const {
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    finished,
    reading,
  } = request.payload;

  if (name === undefined || name.trim() === "") {
    return h
      .response({
        status: "fail",
        message: "Gagal menambahkan buku. Mohon isi nama buku",
      })
      .code(400);
  }

  if (readPage > pageCount) {
    return h
      .response({
        status: "fail",
        message:
          "Gagal menambahkan buku. readPage tidak boleh lebih besar dari pagecount",
      })
      .code(400);
  }

  if (
    typeof name !== "string" ||
    typeof year !== "number" ||
    typeof author !== "string" ||
    typeof summary !== "string" ||
    typeof publisher !== "string" ||
    typeof pageCount !== "number" ||
    typeof readPage !== "number" ||
    typeof reading !== "boolean"
  ) {
    return h
      .response({
        status: "fail",
        message: "Invalid data types",
      })
      .code(400);
  }

  const newBook = {
    id,
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    finished,
    reading,
    createdAt,
    updateAt,
  };

  if (pageCount === readPage) {
    newBook.finished = true;
  } else {
    newBook.finished = false;
  }

  books.push(newBook);

  const isSuccess = books.filter((book) => book.id === id).length > 0;

  if (isSuccess) {
    const response = h.response({
      status: "success",
      message: "Buku berhasil ditambahkan",
      data: {
        booksId: id,
      },
    });
    response.code(201);
    return response;
  }

  const response = h.response({
    status: "fail",
    message: "buku gagal ditambahkan",
  });
  response.code(500);
  return response;
};

module.exports = postDataBooks;
