import { useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../helpers/api-url";

function LogIn(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  let history = useHistory();

  function handleLoginSubmit(event) {
    event.preventDefault();
    axios({
      method: "post",
      url: `${API_URL}/log-in`,
      data: {
        email,
        password,
      },
      withCredentials: true,
    })
      .then((res) => {
        console.log(res);
        if (res.data.message === "User Verified") {
          props.setLoggedInStatus("LOGGED_IN");
          props.setUserId(res.data.user_id);
          history.push("/");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <div>
      <form onSubmit={handleLoginSubmit} className="loginForm">
        <input
          type="email"
          name="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="Your email"
          required
        />

        <input
          type="password"
          name="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          placeholder="Your password"
          required
        />

        <button type="submit">Log In</button>
      </form>
    </div>
  );
}

export default LogIn;
