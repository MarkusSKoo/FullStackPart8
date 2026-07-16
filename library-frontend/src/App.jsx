import { useState } from "react";
import { useApolloClient, useQuery } from "@apollo/client/react";
import Authors from "./components/Authors";
import Books from "./components/Books";
import NewBook from "./components/NewBook";
import { ALL_AUTHORS, ALL_BOOKS } from "./queries";
import Notify from "./components/Notify";
import LoginForm from "./components/LoginForm";
import Recommendations from "./components/Recommendations";

const App = () => {
  const [token, setToken] = useState(
    localStorage.getItem("phonebook-user-token"),
  );
  const [page, setPage] = useState("authors");
  const client = useApolloClient();
  const [errorMessage, setErrorMessage] = useState(null);

  const authorsResult = useQuery(ALL_AUTHORS);
  const booksResult = useQuery(ALL_BOOKS);
  if (authorsResult.loading || booksResult.loading) {
    return <div>...loading</div>;
  }

  const onLogout = () => {
    setToken(null);
    localStorage.clear();
    client.resetStore();
    setPage("authors");
  };

  const notify = (message) => {
    setErrorMessage(message);
    setTimeout(() => {
      setErrorMessage(null);
    }, 10000);
  };

  return (
    <div>
      <div>
        <button onClick={() => setPage("authors")}>authors</button>
        <button onClick={() => setPage("books")}>books</button>
        <>
          {!token && <button onClick={() => setPage("login")}>login</button>}
          {token && (
            <>
              <button onClick={() => setPage("add")}>add book</button>
              <button onClick={onLogout}>logout</button>
              <button onClick={() => setPage("recommended")}>
                recommended
              </button>
            </>
          )}
        </>
      </div>

      <Notify errorMessage={errorMessage} />
      <Authors
        show={page === "authors"}
        authors={authorsResult.data.allAuthors}
        setError={notify}
        token={token}
      />
      <Books show={page === "books"} />
      <NewBook show={page === "add"} setError={notify} setPage={setPage} />
      <LoginForm
        show={page === "login"}
        setError={notify}
        setToken={setToken}
        setPage={setPage}
        client={client}
      />
      <Recommendations
        show={page === "recommended"}
        books={booksResult.data.allBooks}
      />
    </div>
  );
};

export default App;
