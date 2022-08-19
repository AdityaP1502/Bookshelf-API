const {addBooksHandler, readAllBooksHandler,
  updateBooksHandler, readSpecificNoteHandler,
  deleteBooksHandler} = require('./handler');

const routes = [
  {
    method: 'POST',
    path: '/books',
    handler: addBooksHandler,
  },
  {
    method: 'GET',
    path: '/books',
    handler: readAllBooksHandler,
  },
  {
    method: 'GET',
    path: '/books/{bookId}',
    handler: readSpecificNoteHandler,
  },
  {
    method: 'PUT',
    path: '/books/{bookId}',
    handler: updateBooksHandler,
  },
  {
    method: 'DELETE',
    path: '/books/{bookId}',
    handler: deleteBooksHandler,
  },
];

module.exports = routes;
