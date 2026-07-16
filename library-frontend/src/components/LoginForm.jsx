import { useState } from "react";
import { useMutation } from "@apollo/client/react";
import { LOGIN } from "../queries";

const LoginForm = ({ setError, setToken, show, setPage, client }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [login] = useMutation(LOGIN, {
    onCompleted: (data) => {
      const token = data.login.value;
      setToken(token);
      localStorage.setItem("phonebook-user-token", token);
      client.resetStore();

      setUsername("");
      setPassword("");
      setPage("authors");
    },
    onError: (error) => {
      setError(error.message);
    },
  });

  if (!show) {
    return null;
  }

  const submit = async (event) => {
    event.preventDefault();
    await login({ variables: { username, password } });
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={submit}>
        <label>
          <div>
            username
            <input
              value={username}
              onChange={({ target }) => setUsername(target.value)}
            />
          </div>
        </label>
        <label>
          <div>
            password
            <input
              type="password"
              value={password}
              onChange={({ target }) => setPassword(target.value)}
            />
          </div>
        </label>
        <button type="submit">login</button>
      </form>
    </div>
  );
};

export default LoginForm;
