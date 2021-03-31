import axios from "axios";
import { useEffect, useState } from "react";
import { API_URL } from "../helpers/api-url";

function Profile(props) {
  const [userCards, setUserCards] = useState([]);

  useEffect(() => {
    if (props.userId) {
      axios({
        method: "get",
        url: `${API_URL}/user/${props.userId}`,
        withCredentials: true,
      })
        .then((res) => {
          const userValues = res.data.cards.map((card) => {
            return card["api_card_id"];
          });
          const filterdCards = props.cards.filter((card) => {
            return userValues.includes(card.id);
          });
          setUserCards(filterdCards);
        })
        .catch((err) => {
          console.log("error retrieving user data", err);
        });
    }
  }, [props.userId, props.cards]);

  const handleDeleteCard = (cardToDelete) => {
    axios({
      method: "delete",
      url: `${API_URL}/remove-card-from-user`,
      data: {
        api_card_id: cardToDelete.id,
        user_id: props.userId,
      },
    })
      .then((res) => {
        if (res.data === "Card Deleted") {
          setUserCards(userCards.filter((card) => card.id !== cardToDelete.id));
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const renderUserCards = () => {
    return userCards.map((card) => {
      return (
        card.imageUrl && (
          <div key={card.id} className="card">
            <img src={card.imageUrl} alt={card.name} />
            <button onClick={() => handleDeleteCard(card)}>Delete</button>
          </div>
        )
      );
    });
  };

  return (
    <div className="home-content">
      <h1>Profile</h1>
      <div className="home-cards">{renderUserCards()}</div>
    </div>
  );
}

export default Profile;
