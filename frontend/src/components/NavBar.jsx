import "../styles/NavBar.css";
import SearchBar from "./SearchBar";
import { searchBoards } from "../utils";

const NavBar = ({ loadPage, setBoardList }) => {
  const handleSearch = async (event, query) => {
    const boards = await searchBoards(query);
    setBoardList(boards);
  };
  return (
    <nav>
      <SearchBar
        searchType="Boards"
        loadPage={loadPage}
        handleSearch={handleSearch}
      />
      <div className="filter-container">
        <button>All</button>
        <button>Recent</button>
        <button>Celebration</button>
        <button>Thank You</button>
        <button>Inspiration</button>
      </div>
    </nav>
  );
};

export default NavBar;
