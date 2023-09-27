const books = require("../books");

const editDataBooks = (request, h) => {
  const { id } = request.params;

  const index = books.findIndex((book) => book.id === id);

  const {
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    reading,
  } = request.payload;

  const updatedAt = new Date().toISOString();

  if (name === undefined || name.trim() === "") {
    return h
      .response({
        status: "fail",
        message: "Gagal mengubah buku. Mohon isi nama buku",
      })
      .code(400);
  }

  if (readPage > pageCount) {
    return h
      .response({
        status: "fail",
        message:
          "Gagal mengubah buku. readPage tidak boleh lebih besar dari pageCount",
      })
      .code(400);
  }

  const finished = pageCount === readPage;

  if (index !== -1) {
    books[index] = {
      ...books[index],
      name,
      year,
      author,
      summary,
      publisher,
      pageCount,
      readPage,
      finished,
      reading,
      updatedAt,
    };

    const response = h.response({
      status: "success",
      message: "buku berhasil diperbarui",
    });
    response.code(200);
    return response;
  }
  const response = h.response({
    status: "fail",
    message: "Gagal memperbarui buku. Id tidak ditemukan",
  });
  response.code(404);
  return response;
};

module.exports = editDataBooks;
