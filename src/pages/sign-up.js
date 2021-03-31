import axios from "axios";
import { useState } from "react";
import { API_URL } from "../helpers/api-url";
import { useHistory } from "react-router-dom";

function SignUp(props) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  let history = useHistory();

  function handleRegisterSubmit() {
    axios({
      method: "post",
      url: `${API_URL}/sign-up`,
      data: {
        username,
        email,
        password,
      },

      withCredentials: true,
    })
      .then((res) => {
        props.setLoggedInStatus("LOGGED_IN");
        props.setUserId(res.data.id);
        history.push("/");
      })
      .catch((error) => {
        console.log("error creating user", error);
      });
  }

  return (
    <form
      onSubmit={(event) => {
        handleRegisterSubmit(event);
        event.preventDefault();
      }}
      className="sign-up-form"
    >
      <h1>Sign up to make your dream deck</h1>

      <div className="sign-up-input">
        <input
          onChange={(event) => setUsername(event.target.value)}
          value={username}
          type="text"
          name="username"
          placeholder="Your username"
          required
        />
      </div>

      <div className="sign-up-input">
        <input
          onChange={(event) => setEmail(event.target.value)}
          value={email}
          type="email"
          name="email"
          placeholder="Your email"
          required
        />
      </div>

      <div className="sign-up-input">
        <input
          onChange={(event) => setPassword(event.target.value)}
          value={password}
          type="password"
          name="password"
          placeholder="Set password"
          required
        />
      </div>

      <button className="btn" type="submit">
        Sign up
      </button>
    </form>
  );
}

export default SignUp;
