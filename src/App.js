import axios from "axios";

import Home from "./pages/home";
import "./styles/main.scss";
import Icons from "./helpers/icons";
import SignUp from "./pages/sign-up";
import LogIn from "./pages/log-in";
import Profile from "./pages/profile";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { useEffect, useState } from "react";
import Navigation from "./navigation";

function App() {
  const [userId, setUserId] = useState(null);
  const [loggedInStatus, setLoggedInStatus] = useState("NOT_LOGGED_IN");
  const [cards, setCards] = useState([]);

  useEffect(() => {
    axios({
      method: "get",
      url: "http://localhost:5000/mtg-stone/logged-in",
      withCredentials: true,
    })
      .then((res) => {
        if (res.data) {
          setLoggedInStatus("LOGGED_IN");
          setUserId(res.data.user_id);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    axios
      .get("https://api.magicthegathering.io/v1/cards")
      .then((response) => {
        setCards(response.data.cards);
      })
      .catch((error) => {
        console.log("error allCards", error);
      });
  }, []);

  const handleLogout = () => {
    axios({
      method: "post",
      url: "http://localhost:5000/mtg-stone/logout",
      withCredentials: true,
    })
      .then(() => {
        setLoggedInStatus("NOT_LOGGED_IN");
        setUserId("");
        return "Logout successful";
      })
      .catch((err) => console.log(err));
  };

  Icons();
  return (
    <div className="App">
      <BrowserRouter>
        <Navigation
          loggedInStatus={loggedInStatus}
          handleLogout={handleLogout}
        />
        <Switch>
          <Route exact path="/">
            <Home
              loggedInStatus={loggedInStatus}
              userId={userId}
              handleLogout={handleLogout}
              setCards={setCards}
              cards={cards}
            />
          </Route>
          <Route path="/sign-up" component={SignUp} />
          <Route path="/log-in">
            <LogIn
              setLoggedInStatus={setLoggedInStatus}
              setUserId={setUserId}
            />
          </Route>
          <Route path="/profile">
            <Profile userId={userId} cards={cards} />
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
