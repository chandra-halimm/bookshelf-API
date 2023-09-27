const getAllBooks = require("./handler/get");
const postDataBooks = require("./handler/post");

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
];

module.exports = routes;
