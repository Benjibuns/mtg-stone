import { useState, useEffect } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function Home(props) {
  const [cards, setCards] = useState([]);

  function allCards() {
    axios
      .get("https://api.magicthegathering.io/v1/cards")
      .then((response) => {
        setCards(response.data.cards);
      })
      .catch((error) => {
        console.log("error allCards", error);
      });
  }

  function handleAddCard(params) {
    axios({
      method: "post",
      url: "http://localhost:5000/mtg-stone/add-card-to-user",
      data: {
        card_name: params.name,
        api_card_id: params.id,
        user_id: props.userId,
      },
      withCredentials: true,
    })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function renderCards() {
    if (props.userId) {
      return cards.map((card) => {
        return (
          card.imageUrl && (
            <div key={card.id} className="card">
              <img src={card.imageUrl} alt={card.name} />

              <div className="fav-icon_btn">
                <button onClick={() => handleAddCard(card)}>
                  <FontAwesomeIcon icon="star" />
                </button>
              </div>
            </div>
          )
        );
      });
    } else {
      return cards.map((card) => {
        return (
          card.imageUrl && (
            <div key={card.id} className="card">
              <img src={card.imageUrl} alt={card.name} />
            </div>
          )
        );
      });
    }
  }

  useEffect(() => {
    allCards();
  }, []);

  return (
    <div className="home-content">
      <div className="nav-bar">
        <div className="nav-items">
          {props.loggedInStatus === "LOGGED_IN" ? (
            <div className="auth-components">
              <button>Logout</button>
            </div>
          ) : (
            <div className="auth-components">
              <a href="/sign-up">Sign Up</a>
              <a href="/log-in">log in</a>
            </div>
          )}
        </div>
      </div>
      <div className="home-cards">{renderCards()}</div>
    </div>
  );
}

export default Home;
