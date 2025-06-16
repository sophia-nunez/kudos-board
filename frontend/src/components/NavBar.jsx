import '../styles/NavBar.css'

const NavBar = () => {
  return (
    <nav>
      <div className="search-container">
        <input type="search" placeholder="Search boards..." />
        <button>Search</button>
        <button>Clear</button>
      </div>
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
