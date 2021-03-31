import axios from "axios";
import { useEffect, useState } from "react";

function Profile(props) {
  const [username, setUsername] = useState("");
  const [userCards, setUserCards] = useState([]);

  useEffect(() => {
    if (props.userId) {
      axios({
        method: "get",
        url: `http://localhost:5000/mtg-stone/user/${props.userId}`,
        withCredentials: true,
      })
        .then((res) => {
          console.log(userCards);
          cardFilter(res.data.cards);
          // setUserCards(res.data.cards);
          // console.log(res.data.cards);
        })
        .catch((err) => {
          console.log("error retrieving user data", err);
        });
    }
  }, [props.userId]);

  const cardFilter = (cards) => {
    console.log(props.cards);
    console.log(cards);
    const userValues = cards.map((card) => {
      return card["api_card_id"];
    });
    console.log(userValues);

    const filterdCards = props.cards.filter((card) => {
      return userValues.includes(card.id);
    });
    console.log(filterdCards);
    setUserCards(filterdCards);
  };

  const handleDeleteCard = (cardToDelete) => {
    axios({
      method: "delete",
      url: `http://localhost:5000/mtg-stone/remove-card-from-user`,
      data: {
        api_card_id: cardToDelete.id,
        user_id: props.userId,
      },
    })
      .then((res) => {
        if (res.data == "Card Deleted") {
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

// const userCards = [
//   {"api_card_id": "1"},
//   {"api_card_id": "2"},
//   {"api_card_id": "3"}
// ]
// const user_values = user_cards.map((card) => {
//   return card["api_card_id"];
// });
// console.log(user_values);
// console.log(user_values.includes('1'))
// const cards = [
//   {
//     "id": "1",
//     "name": "api_card_1"
//   },
//   {
//     "id": "2",
//     "name": "api_card_2"
//   },
//   {
//     "id": "3",
//     "name": "api_card_3"
//   },
//   {
//     "id": "4",
//     "name": "api_card_4"
//   },
// ]
// const filterd_cards = cards.filter((card) => {
//   return user_values.includes(card.id);
// });
// console.log(filterd_cards);
