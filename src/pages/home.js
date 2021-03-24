import { useState, useEffect } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function Home() {
  const [cards, setCards] = useState([]);

  function allCards() {
    axios
      .get("https://api.magicthegathering.io/v1/cards")
      .then((response) => {
        console.log(response.data.cards);
        setCards(response.data.cards);
      })
      .catch((error) => {
        console.log("error allCards", error);
      });
  }

  const renderCards = () => {
    return cards.map((card) => {
      return (
        card.imageUrl && (
          <div key={card.id} className="card">
            <img src={card.imageUrl} alt={card.name} />

            <div className="fav-icon_btn">
              <a>
                <FontAwesomeIcon icon="star" />
              </a>
            </div>
          </div>
        )
      );
    });
  };

  useEffect(() => {
    allCards();
  }, []);

  return (
    <div className="home-content">
      <div className="nav-bar">
        <div className="nav-items">
          <a href="/sign-up">Sign Up</a>
          <button>log in</button>
        </div>
      </div>
      <div className="home-cards">{renderCards()}</div>
    </div>
  );
}

export default Home
