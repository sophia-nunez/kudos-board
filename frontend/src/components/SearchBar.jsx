import "../styles/SearchBar.css";

const SearchBar = ({
  query,
  setQuery,
  searchType,
  loadPage,
  setBoardChange,
}) => {
  const updateSearch = async (event) => {
    // TODO: what happens if user inputs smth like "   "
    const currQuery = event.target.value;
    setQuery(currQuery);
  };

  const enterSearch = (event) => {
    e.stopPropagation();
    if (event.key === "Enter") {
      loadPage(event);
    }
  };

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
