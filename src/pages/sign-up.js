import axios from "axios";
import { useState, useEffect } from "react";

function SignUp() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit() {
    axios({
      method: "post",
      url: "http://localhost:5000/mtg-stone/sign-up",
      data: {
        username: username,
        email: email,
        password: password,
      },

      withCredentials: true,
    })
      .then((response) => {
        console.log("user", response);
      })
      .catch((error) => {
        console.log("error creating user", error);
      });
  }

  return (
    <form
      onSubmit={(event) => {
        handleSubmit(event);
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
        />
        This will be shown with your public decks
      </div>

      <div className="sign-up-input">
        <input
          onChange={(event) => setEmail(event.target.value)}
          value={email}
          type="email"
          name="email"
          placeholder="Your email"
        />
      </div>

      <div className="sign-up-input">
        <input
          onChange={(event) => setPassword(event.target.value)}
          value={password}
          type="password"
          name="password"
          placeholder="Set password"
        />
      </div>

      <button className="btn" type="submit">
        Sign up
      </button>
    </form>
  );
}

export default SignUp;
