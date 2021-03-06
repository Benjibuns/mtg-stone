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
import { API_URL } from "./helpers/api-url";

function App() {
  const [userId, setUserId] = useState(null);
  const [loggedInStatus, setLoggedInStatus] = useState("NOT_LOGGED_IN");
  const [cards, setCards] = useState([]);
  const [searchedCard, setSearchedCard] = useState({});

  useEffect(() => {
    axios({
      method: "get",
      url: `${API_URL}/logged-in`,
      withCredentials: true,
    })
      .then((res) => {
        if (res.data.message === "User Verified") {
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

  const cardSearchFilter = (cardName) => {
    const filteredCard = cards.filter((card) => {
      return card.name.toLowerCase() === cardName.toLowerCase();
    })[0];
    if (filteredCard) {
      setSearchedCard(filteredCard);
    }
  };

  const handleLogout = () => {
    axios({
      method: "post",
      url: `${API_URL}/logout`,
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
          cards={cards}
          setCards={setCards}
          cardSearchFilter={cardSearchFilter}
        />
        <Switch>
          <Route exact path="/">
            <Home
              loggedInStatus={loggedInStatus}
              userId={userId}
              handleLogout={handleLogout}
              setCards={setCards}
              cards={cards}
              searchedCard={searchedCard}
              setSearchedCard={setSearchedCard}
            />
          </Route>
          <Route path="/sign-up">
            <SignUp
              setLoggedInStatus={setLoggedInStatus}
              setUserId={setUserId}
            />
          </Route>
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
