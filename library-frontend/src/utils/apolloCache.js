import { ALL_BOOKS } from "../queries";

export const addBookToCache = (cache, bookToAdd) => {
  cache.updateQuery(
    {
      query: ALL_BOOKS,
      variables: { genre: null },
    },
    (data) => {
      if (!data) {
        return null;
      }

      const bookExists = data.allBooks.some(
        (book) => book.id === bookToAdd.id
      );

      if (bookExists) {
        return data;
      }

      return {
        allBooks: data.allBooks.concat(bookToAdd),
      };
    }
  );

  cache.updateQuery(
    {
      query: ALL_BOOKS,
    },
    (data) => {
      if (!data) {
        return null;
      }

      const bookExists = data.allBooks.some(
        (book) => book.id === bookToAdd.id
      );

      if (bookExists) {
        return data;
      }

      return {
        allBooks: data.allBooks.concat(bookToAdd),
      };
    }
  );

  bookToAdd.genres.forEach((genre) => {
    cache.updateQuery(
      {
        query: ALL_BOOKS,
        variables: { genre },
      },
      (data) => {
        if (!data) {
          return null;
        }

        const bookExists = data.allBooks.some(
          (book) => book.id === bookToAdd.id
        );

        if (bookExists) {
          return data;
        }

        return {
          allBooks: data.allBooks.concat(bookToAdd),
        };
      }
    );
  });
};