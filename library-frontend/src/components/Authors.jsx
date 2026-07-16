import { useState } from "react";
import { useMutation } from "@apollo/client/react";
import { UPDATE_BORN, ALL_AUTHORS } from "../queries";

const Authors = ({ setError, show, authors, token }) => {
  const [name, setName] = useState("");
  const [born, setBorn] = useState("");

  const [updateBorn] = useMutation(UPDATE_BORN, {
    onCompleted: (data) => {
      if (!data.editAuthor) {
        setError("Author not found");
      }
    },
    refetchQueries: [{ query: ALL_AUTHORS }],
  });

  if (!show) {
    return null;
  }

  const submit = async (event) => {
    event.preventDefault();

    await updateBorn({
      variables: { name, setBornTo: Number(born) },
    });

    setName("");
    setBorn("");
  };

  return (
    <div>
      <div>
        <h2>Authors</h2>
        <table>
          <tbody>
            <tr>
              <th>Author</th>
              <th>Born</th>
              <th>Books</th>
            </tr>
            {authors.map((a) => (
              <tr key={a.id}>
                <td>{a.name}</td>
                <td>{a.born}</td>
                <td>{a.bookCount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {token && (
        <form onSubmit={submit}>
          <h3>Set birthyear</h3>
          <div>
            Name
            <select
              name="name"
              value={name}
              onChange={({ target }) => setName(target.value)}
              required
            >
              <option value="" disabled>
                Select author
              </option>
              {authors.map((a) => (
                <option key={a.id} value={a.name}>
                  {a.name}
                </option>
              ))}
            </select>
          </div>
          <label>
            <div>
              Born
              <input
                value={born}
                onChange={({ target }) => setBorn(target.value)}
              ></input>
            </div>
          </label>
          <button type="submit">Update author</button>
        </form>
      )}
    </div>
  );
};

export default Authors;
