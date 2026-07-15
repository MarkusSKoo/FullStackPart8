import { useState } from "react";
import { useMutation } from "@apollo/client/react";
import { UPDATE_BORN, ALL_AUTHORS } from "../queries";

const Authors = (props) => {
  const [name, setName] = useState("");
  const [born, setBorn] = useState("");
  const setError = props.setError;

  const [updateBorn] = useMutation(UPDATE_BORN, {
    onCompleted: (data) => {
      if (!data.editAuthor) {
        setError("Author not found");
      }
    },
    refetchQueries: [{ query: ALL_AUTHORS }],
  });

  if (!props.show) {
    return null;
  }

  const authors = props.authors;

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
        <h2>authors</h2>
        <table>
          <tbody>
            <tr>
              <th></th>
              <th>born</th>
              <th>books</th>
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
      <form onSubmit={submit}>
        <h3>Set birthyear</h3>
        <div>
          name
          <select
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
        <div>
          born
          <input
            value={born}
            onChange={({ target }) => setBorn(target.value)}
          ></input>
        </div>
        <button type="submit">update author</button>
      </form>
    </div>
  );
};

export default Authors;
