const books = require("../books");

const getAllBooks = (request, h) => {
  const { bookID, bookName, bookPublisher } = request.params;

  const filteredBooks = books.filter((book) => {
    return (
      (!bookID || book.id === bookID) &&
      (!bookName || book.name === bookName) &&
      (!bookPublisher || book.publisher === bookPublisher)
    );
  });

  const response = h.response({
    status: "success",
    message: "success get data",
    data: {
      books: filteredBooks.map((book) => ({
        id: book.id,
        name: book.name,
        publisher: book.publisher,
      })),
    },
  });

  if (filteredBooks.length === 0) {
    response.code(404);
  } else {
    response.code(200);
  }

  return response;
};

const getBooksById = (request, h) => {
  const { id } = request.params;

  const book = books.find((b) => b.id === id);

  if (book) {
    return {
      status: "success",
      data: {
        book,
      },
    };
  }

  const response = h
    .response({
      status: "fail",
      message: "Buku tidak ditemukan",
    })
    .code(404);

  return response;
};

module.exports = { getAllBooks, getBooksById };
