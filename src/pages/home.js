import { useState, useEffect } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

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
      <div className="nav-bar">
        {props.loggedInStatus === "LOGGED_IN" ? (
          <div className="nav-bar_left">
            <div className="profile">
              <Link className="profile-btn" to="/profile">
                Profile
              </Link>
            </div>

            <div className="nav-bar_right">
              <button
                className="logout-btn"
                onClick={() => props.handleLogout()}
              >
                Logout
              </button>
            </div>
          </div>
        ) : (
          <div className="nav-bar_right">
            <Link to="/sign-up">Sign Up</Link>
            <Link to="/log-in">log in</Link>
          </div>
        )}
      </div>
      <div className="home-cards">{renderCards()}</div>
    </div>
  );
}

export default Home;
