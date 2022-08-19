const {nanoid} = require('nanoid');
const {books} = require('./books');

const filterBookByName = (name, data) => data.filter(
    (book) => (book.name.match(new RegExp(name, 'i')) !== null),
);

const filterBookByReadingValue = (reading, data) => data.filter(
    (book) => (book.reading == reading),
);

const filterBookByFinishedValue = (finished, data) => data.filter(
    (book) => (book.finished == finished),
);

const isBookNameValid = (name) => {
  if (!name) return false;

  return true;
};

const isPageNumberValid = (pageCount, readPage, h) => (pageCount >= readPage);

const addBooksHandler = (request, h) => {
  try {
    const {name, year, author, summary, publisher} = request.payload;
    const {pageCount, readPage, reading} = request.payload;

    if (!isBookNameValid(name)) {
      /* book name isn't valid */
      const response = h.response({
        status: 'fail',
        message: 'Gagal menambahkan buku. Mohon isi nama buku',
      });

      response.code(400);
      response.type('application/json');
      return response;
    } else if (!isPageNumberValid(pageCount, readPage)) {
      /* readPage isn't valid */
      const response = h.response({
        status: 'fail',
        // eslint-disable-next-line max-len
        message: 'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount',
      });

      response.code(400);
      response.type('application/json');
      return response;
    } else {
      const id = nanoid(16);
      const date = new Date().toISOString();

      const insertedAt = date;
      const updatedAt = date;
      const finished = (pageCount === readPage);

      const book = {
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
        insertedAt,
        updatedAt,
      };

      // Append book to storage
      books.push(book);

      const isSuccess = books.filter((note) => (note.id === id)).length > 0;
      if (isSuccess) {
        const response = h.response({
          status: 'success',
          message: 'Buku berhasil ditambahkan',
          data: {
            bookId: id,
          },
        });

        response.code(201);
        response.type('application/json');
        // updateFile(books, filepath);

        return response;
      }
      /* Failed appending to storage */
      const response = h.response({
        status: 'error',
        message: 'Buku gagal ditambahkan',
      });

      response.code(500);
      response.type('application/json');
      return response;
    }
  } catch (err) {
    /* General Error */
    const response = h.response({
      status: 'error',
      message: 'Buku gagal ditambahkan',
    });

    response.code(500);
    response.type('application/json');
    return response;
  }
};

const readAllBooksHandler = (request, h) => {
  const {name, finished, reading} = request.query;
  let bookFiltered = books;

  // filter the books data if given name query params
  if (name !== undefined) {
    bookFiltered = filterBookByName(name, bookFiltered);
  }

  // Filter the books data if given reading query params
  if (reading !== undefined) {
    bookFiltered = filterBookByReadingValue(reading, bookFiltered);
  }

  // Filter the books data if given finished query params
  if (finished !== undefined) {
    bookFiltered = filterBookByFinishedValue(finished, bookFiltered);
  }

  // Format the books filtered to only include the necesary properties
  const responseData = bookFiltered.map(
      ({id, name, publisher}) => ({
        id,
        name,
        publisher,
      }),
  );

  const response = h.response({
    status: 'success',
    data: {
      books: responseData,
    },
  });

  response.code(200);
  response.type('application/json');

  return response;
};

const readSpecificNoteHandler = (request, h) => {
  const {bookId: id} = request.params;
  const bookFiltered = books.filter((book) => (book.id === id));
  const isSuccess = bookFiltered.length > 0;

  if (isSuccess) {
    const book = bookFiltered[0];
    const response = h.response({
      status: 'success',
      data: {
        book,
      },
    });

    response.code(200);
    response.type('application/json');

    return response;
  }

  const response = h.response({
    status: 'fail',
    message: 'Buku tidak ditemukan',
  });

  response.code(404);
  response.type('application/json');

  return response;
};

const updateBooksHandler = (request, h) => {
  const {bookId: id} = request.params;
  const data = request.payload;
  const {name, pageCount, readPage} = data;
  /* search if id exist */
  const idx = books.findIndex((book) => (book.id === id));

  if (idx >= 0) {
    /* Check name and readPage */
    if (!isBookNameValid(name)) {
      const response = h.response({
        status: 'fail',
        message: 'Gagal memperbarui buku. Mohon isi nama buku',
      });

      response.code(400);
      response.type('application/json');
      return response;
    } else if (!isPageNumberValid(pageCount, readPage)) {
      const response = h.response({
        status: 'fail',
        // eslint-disable-next-line max-len
        message: 'Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount',
      });

      response.code(400);
      response.type('application/json');
      return response;
    } else {
      const reading = pageCount === readPage;
      books[idx] = {...books[idx], ...data, reading};
      // updateFile(books, filepath);
      const response = h.response({
        status: 'success',
        message: 'Buku berhasil diperbarui',
      });

      response.code(200);
      response.type('application/json');

      return response;
    }
  }

  const response = h.response({
    status: 'fail',
    message: 'Gagal memperbarui buku. Id tidak ditemukan',
  });

  response.code(404);
  response.type('application/json');

  return response;
};

const deleteBooksHandler = (request, h) => {
  const {bookId: id} = request.params;
  const idx = books.findIndex((book) => (book.id === id));
  if (idx >= 0) {
    books.splice(idx, 1);
    // updateFile(books, filepath);
    const response = h.response({
      status: 'success',
      message: 'Buku berhasil dihapus',
    });

    response.code(200);
    response.type('application/json');

    return response;
  }

  const response = h.response({
    status: 'fail',
    message: 'Buku gagal dihapus. Id tidak ditemukan',
  });

  response.code(404);
  response.type('application/json');

  return response;
};

module.exports = {addBooksHandler,
  readAllBooksHandler, readSpecificNoteHandler,
  updateBooksHandler, deleteBooksHandler};
