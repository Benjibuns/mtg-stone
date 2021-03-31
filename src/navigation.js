import { useState } from "react";

import { NavLink } from "react-router-dom";
import CardSearch from "./card-search/search-bar";

const Navigation = (props) => {
  // const [input, setInput] = useState("");

  if (props.loggedInStatus === "LOGGED_IN") {
    return (
      <div className="nav-bar">
        <div className="nav-bar_left">
          <NavLink to="/">Home</NavLink>
          <div className="profile">
            <NavLink className="profile-btn" to="/profile">
              Profile
            </NavLink>
          </div>

          <CardSearch cardSearchFilter={props.cardSearchFilter}/>

          <div className="nav-bar_right">
            <button className="logout-btn" onClick={() => props.handleLogout()}>
              Logout
            </button>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="nav-bar">
      <div className="nav-bar_left">
        <NavLink className="profile-btn" to="/">
          Home
        </NavLink>
      </div>

      <CardSearch cardSearchFilter={props.cardSearchFilter}/>

      <div className="nav-bar_right">
        <NavLink to="/sign-up">Sign Up</NavLink>
        <NavLink to="/log-in">log in</NavLink>
      </div>
    </div>
  );
};

export default Navigation;
