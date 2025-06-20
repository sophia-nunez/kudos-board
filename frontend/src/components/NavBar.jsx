import "../styles/NavBar.css";
import SearchBar from "./SearchBar";
import { useEffect } from "react";

const NavBar = ({
  filter,
  setFilter,
  query,
  setQuery,
  loadPage,
  setBoardChange,
}) => {
  useEffect(() => {
    loadPage();
    if (filter === "all") {
      setQuery("");
    }
  }, [filter]);

  const onFilter = async (event) => {
    let selected = event.currentTarget.id;
    if (selected === "ThankYou") {
      selected = "Thank you";
    }
    setFilter(selected);
  };

  return (
    <nav>
      <SearchBar
        setBoardChange={setBoardChange}
        query={query}
        setQuery={setQuery}
        searchType="Boards"
        loadPage={loadPage}
        handleSearch={loadPage}
      />
      <div className="filter-container">
        <button
          id="all"
          className={filter === "all" ? "selected" : ""}
          onClick={onFilter}
        >
          All
        </button>
        <button
          id="Recent"
          className={filter === "Recent" ? "selected" : ""}
          onClick={onFilter}
        >
          Recent
        </button>
        <button
          id="Celebration"
          className={filter === "Celebration" ? "selected" : ""}
          onClick={onFilter}
        >
          Celebration
        </button>
        <button
          id="ThankYou"
          className={filter === "Thank you" ? "selected" : ""}
          onClick={onFilter}
        >
          Thank You
        </button>
        <button
          id="Inspiration"
          className={filter === "Inspiration" ? "selected" : ""}
          onClick={onFilter}
        >
          Inspiration
        </button>
      </div>
    </nav>
  );
};

export default NavBar;
