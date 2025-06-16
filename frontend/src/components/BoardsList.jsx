import Board from "./Board";
import "../styles/main.css";

const BoardsList = () => {
  return (
    <main className="board-page">
      <h2> Boards</h2>
      <button>Create a New Board</button>
      <section className="board-list">
        <Board />
        <Board />
      </section>
    </main>
  );
};

export default BoardsList;
