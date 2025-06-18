import { useState, useEffect } from "react";
import "../styles/SearchBar.css";

const SearchBar = ({ searchType, loadPage, handleSearch }) => {
  const [query, setQuery] = useState("");

  const updateSearch = async (event) => {
    const currQuery = event.target.value;
    setQuery(currQuery);
  };

  const enterSearch = (event) => {
    if (event.key === "Enter") {
      handleSearch(event, query);
    }
  };

  const clearSearch = () => {
    setQuery("");
    loadPage();
  };

  return (
    <div className="search-bar">
      <label htmlFor="query" />
      <input
        type="text"
        name="query"
        id="query"
        placeholder={`Search ${searchType}...`}
        value={query}
        onChange={updateSearch}
        onKeyUp={enterSearch}
      />
      <button onClick={(e) => handleSearch(e, query)}>Search</button>
      <button onClick={clearSearch}>Clear</button>
    </div>
  );
};

export default SearchBar;
