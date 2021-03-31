import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { API_URL } from "../helpers/api-url";

function Home(props) {
  function handleAddCard(params) {
    axios({
      method: "post",
      url: `${API_URL}/add-card-to-user`,
      data: {
        card_name: params.name,
        api_card_id: params.id,
        user_id: props.userId,
      },
      withCredentials: true,
    })
      .then((res) => {
        if (res.data === "Added to library") {
          alert("Card Added To Your Profile");
        }
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

  const renderSearchedCard = () => {
    return (
      <div className="card">
        <img src={props.searchedCard.imageUrl} alt={props.searchedCard.name} />
        {props.userId && (
          <div className="fav-icon_btn">
            <button onClick={() => handleAddCard(props.searchedCard)}>
              <FontAwesomeIcon icon="star" />
            </button>
          </div>
        )}
        <button onClick={() => props.setSearchedCard({})}>Reset</button>
      </div>
    );
  };

  if (Object.keys(props.searchedCard).length > 0) {
    return (
      <div className="home-content">
        <div className="home-cards">{renderSearchedCard()}</div>
      </div>
    );
  } else {
    return (
      <div className="home-content">
        <div className="home-cards">{renderCards()}</div>
      </div>
    );
  }
}

export default Home;
