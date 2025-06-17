import { NavLink } from "react-router";
import boardImage from "../assets/images/placeholder.jpg";
import "../styles/main.css";

const Board = ({ id, name, description, image, cards }) => {
  return (
    <NavLink to={`/board/${id}`} end>
      <article className="board">
        <img
          className="board-image"
          src={boardImage}
          alt="Cover image for Board"
        />
        <h3>{name}</h3>
        <p>{description}</p>
        <div className="edit-buttons">
          <button>View Board</button>
          <button data-id={id}>Delete Board</button>
        </div>
      </article>
    </NavLink>
  );
};

export default Board;
