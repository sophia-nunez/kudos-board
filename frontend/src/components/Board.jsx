import boardImage from "../assets/images/placeholder.jpg";
import "../styles/main.css";

const Board = () => {
  return (
    <article className="board">
      <img
        className="board-image"
        src={boardImage}
        alt="Cover image for Board"
      />
      <h3>Board Name</h3>
      <p>description</p>
      <div className="edit-buttons">
        <button>View Board</button>
        <button>Delete Board</button>
      </div>
    </article>
  );
};

export default Board;
