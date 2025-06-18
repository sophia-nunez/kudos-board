import "../styles/NavBar.css";
import SearchBar from "./SearchBar";
import { searchBoards, filterBoards } from "../utils";
import { useState } from "react";
import { useEffect } from "react";

const NavBar = ({ loadPage, setBoardList }) => {
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    handleFilter();
  }, [filter]);

  const handleSearch = async (event, query) => {
    const boards = await searchBoards(query);
    if (boards === "error") {
      console.error("failed to load boards");
    } else {
      setBoardList(boards);
    }
  };

  const onFilter = async (event) => {
    setFilter(event.currentTarget.id);
  };

  const handleFilter = async (event) => {
    if (filter === "all") {
      loadPage();
    } else {
      const boards = await filterBoards(filter);
      if (boards === "error") {
        console.error("failed to load boards");
      } else {
        setBoardList(boards);
      }
    }
  };

  return (
    <nav>
      <SearchBar
        searchType="Boards"
        loadPage={loadPage}
        handleSearch={handleSearch}
      />
      <div className="filter-container">
        <button id="all" onClick={onFilter}>
          All
        </button>
        <button id="Recent" onClick={onFilter}>
          Recent
        </button>
        <button id="Celebration" onClick={onFilter}>
          Celebration
        </button>
        <button id="Thank You" onClick={onFilter}>
          Thank You
        </button>
        <button id="Inspiration" onClick={onFilter}>
          Inspiration
        </button>
      </div>
    </nav>
  );
};

export default NavBar;
