import "../styles/SearchBar.css";

const SearchBar = ({
  query,
  setQuery,
  searchType,
  loadPage,
  setBoardChange,
}) => {
  // updates query based on passed in setQuery (board vs. gif)
  const updateSearch = async (event) => {
    const currQuery = event.target.value;
    setQuery(currQuery);
  };

  const enterSearch = (event) => {
    event.stopPropagation();
    if (event.key === "Enter") {
      loadPage(event);
    }
  };

  // resets search bar
  const clearSearch = () => {
    setQuery("");
    setBoardChange((prev) => !prev);
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
      <button type="button" onClick={(e) => loadPage(e)}>
        Search
      </button>
      <button type="button" onClick={clearSearch}>
        Clear
      </button>
    </div>
  );
};

export default SearchBar;
