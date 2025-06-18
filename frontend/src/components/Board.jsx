import { Link } from "react-router";
import "../styles/main.css";
import { deleteBoard } from "../utils";

const Board = ({ id, title, description, image, cards }) => {
  const handleDelete = (event) => {
    event.stopPropagation();
    const id = event.target.dataset.id;
    const result = deleteBoard(id);
  };

  return (
    <Link to={`/board/${id}`} className="board-link">
      <article className="board">
        <img className="board-image" src={image} alt="Cover image for Board" />
        <h3>{title}</h3>
        <p>{description}</p>
        <div className="edit-buttons">
          <button>View Board</button>
          <button data-id={id} onClick={handleDelete}>
            Delete Board
          </button>
        </div>
      </article>
    </Link>
  );
};

export default Board;
