const deleteDataBooks = require("./handler/delete");
const postDataBooks = require("./handler/post");
const { getAllBooks, getBooksById } = require("./handler/get");
const editDataBooks = require("./handler/put");

const routes = [
  {
    method: "GET",
    path: "/books",
    handler: getAllBooks,
  },
  {
    method: "POST",
    path: "/books",
    handler: postDataBooks,
  },
  {
    method: "DELETE",
    path: "/books/{id}",
    handler: deleteDataBooks,
  },
  {
    method: "GET",
    path: "/books/{id}",
    handler: getBooksById,
  },
  {
    method: "PUT",
    path: "/books/{id}",
    handler: editDataBooks,
  },
];

module.exports = routes;
