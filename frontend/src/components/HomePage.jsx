import NavBar from "./NavBar";
import Board from "./Board";
import CreateModal from "./CreateModal.jsx";
import "../styles/main.css";
import "../styles/HomePage.css";
import { useState, useEffect, useRef } from "react";
import { fetchBoards } from "./../utils.js";

const HomePage = () => {
  const [boardList, setBoardList] = useState(Array());
  const [modalOpen, setModalOpen] = useState(false);
  const modalRef = useRef(null);

  useEffect(() => {
    loadHomePage();
  }, []);

  const loadHomePage = async () => {
    const boards = await fetchBoards();
    setBoardList(boards);

    // TODO: if boards is empty, return something to client
  };

  const openCreateModal = () => {
    setModalOpen(true);
  };

  // closes modal on window click off of modal or on span
  useEffect(() => {
    function handleWindowClick(event) {
      const span = document.getElementsByClassName("close")[0];
      if (event.target === span) {
        setModalOpen(false);
      }
      if (modalRef.current && event.target === modalRef.current) {
        setModalOpen(false);
      }
    }

    window.addEventListener("click", handleWindowClick);

    return () => {
      window.removeEventListener("click", handleWindowClick);
    };
  }, []);

  return (
    <>
      <NavBar loadPage={loadHomePage} setBoardList={setBoardList} />
      <main className="board-page">
        <h2> Boards</h2>
        <button onClick={openCreateModal}>Create a New Board</button>
        <section className="board-list">
          {boardList.length === 0 && <p>No boards to display.</p>}
          {boardList &&
            boardList.map((board) => {
              return (
                <Board
                  key={board.id}
                  id={board.id}
                  title={board.title}
                  description={board.description}
                  image={board.imageURL}
                  cards={board.cards}
                />
              );
            })}
        </section>
      </main>
      {modalOpen && (
        <CreateModal
          modalType="create-board"
          reference={modalRef}
          setModalOpen={setModalOpen}
        />
      )}
    </>
  );
};

export default HomePage;
