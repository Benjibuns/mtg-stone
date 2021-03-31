import { useState } from "react";

const CardSearch = (props) => {
  const [input, setInput] = useState("");

  const SearchData = (e) => {
    e.preventDefault();
    props.cardSearchFilter(input)
  };

  return (
    <div className="nav-bar_search">
      <form onSubmit={SearchData}>
        <input
          type="text"
          placeholder="search by card name"
          onChange={(e) => setInput(e.target.value)}
        />

        <button type="submit">Search</button>
      </form>
    </div>
  );
};

export default CardSearch;
