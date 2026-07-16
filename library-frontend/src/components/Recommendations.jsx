import { ME, ALL_BOOKS } from "../queries";
import { useQuery } from "@apollo/client/react";

const Recommendations = ({ show }) => {
  const currentUser = useQuery(ME);

  const favoriteGenre =
    currentUser.data && currentUser.data.me
      ? currentUser.data.me.favoriteGenre
      : null;

  const books = useQuery(ALL_BOOKS, {
    variables: { genre: favoriteGenre },
    skip: !favoriteGenre,
  });

  if (currentUser.loading || books.loading) {
    return <div>...loading</div>;
  }

  const booksToShow = books.data ? books.data.allBooks : [];

  if (!show) {
    return null;
  }

  return (
    <div>
      <h2>Recommendations</h2>
      <p>
        Books in your favorite genre <strong>{favoriteGenre}</strong>
      </p>
      <table>
        <tbody>
          <tr>
            <th>Title</th>
            <th>Author</th>
            <th>published</th>
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
    </div>
  );
};

export default Recommendations;
