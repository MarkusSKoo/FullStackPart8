import { useState } from "react";
import { useQuery } from "@apollo/client/react";
import { ALL_BOOKS } from "../queries";

const Books = ({ show }) => {
  const [filter, setFilter] = useState("");

  const filteredBooks = useQuery(ALL_BOOKS, {
    variables: {
      genre: filter || null,
    },
  });

  const books = useQuery(ALL_BOOKS);

  if (filteredBooks.loading || books.loading) {
    return <div>...loading</div>;
  }

  const genres = new Set();

  books.data.allBooks.forEach((book) => {
    book.genres.forEach((genre) => {
      genres.add(genre);
    });
  });

  const genresArray = Array.from(genres);
  const booksToShow = filteredBooks.data.allBooks;

  if (!show) {
    return null;
  }

  return (
    <div>
      <h2>Books</h2>

      <p>
        in genre <strong>{filter || "all genres"}</strong>
      </p>

      <table>
        <tbody>
          <tr>
            <th>Title</th>
            <th>Author</th>
            <th>Published</th>
          </tr>
          {booksToShow.map((b) => (
            <tr key={b.id}>
              <td>{b.title}</td>
              <td>{b.author.name}</td>
              <td>{b.published}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {genresArray.map((genre) => (
        <button key={genre} onClick={() => setFilter(genre)}>
          {genre}
        </button>
      ))}
      <button key={"empty"} onClick={() => setFilter("")}>
        all genres
      </button>
    </div>
  );
};

export default Books;
