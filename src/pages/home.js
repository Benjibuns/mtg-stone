import { useState, useEffect } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function Home(props) {
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
      return props.cards.map((card) => {
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
      return props.cards.map((card) => {
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
    renderCards();
  }, [props.userId]);

  return (
    <div className="home-content">
      <div className="home-cards">{renderCards()}</div>
    </div>
  );
}

export default Home;
