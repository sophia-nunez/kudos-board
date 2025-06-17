import { NavLink } from "react-router";
import boardImage from "../assets/images/placeholder.jpg";
import "../styles/main.css";

const Board = () => {
  return (
    <NavLink to="board/id" end>
      <article className="board">
        <img
          className="board-image"
          src={boardImage}
          alt="Cover image for Board"
        />
        <h3>Board Name</h3>
        <p>description</p>
        <div className="edit-buttons">
          <NavLink to="/board/id" end>
            <button>View Board</button>
          </NavLink>
          <button>Delete Board</button>
        </div>
      </article>
    </NavLink>
  );
};

export default Board;
