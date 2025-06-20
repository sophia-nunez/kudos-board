import NavBar from "./NavBar";
import Board from "./Board";
import CreateModal from "./CreateModal.jsx";
import "../styles/main.css";
import "../styles/HomePage.css";
import { useState, useEffect, useRef } from "react";
import { fetchBoards } from "../utils/boardUtils.js";
import { FaSpinner } from "react-icons/fa6";

const HomePage = () => {
  const [boardList, setBoardList] = useState(Array());
  const [boardChange, setBoardChange] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingError, setLoadingError] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const modalRef = useRef(null);

  // search and nav
  const [filter, setFilter] = useState("all");
  const [query, setQuery] = useState("");

  useEffect(() => {
    loadHomePage();
    console.log("home page fault");
  }, [boardChange]);

  const loadHomePage = async () => {
    setIsLoading(true);
    const currQuery = new URLSearchParams({
      title: query,
      description: filter,
    });
    const boards = await fetchBoards(currQuery);
    if (boards === "error") {
      console.error("Failed to load boards");
      setLoadingError(true);
    } else {
      if (filter === "Recent") {
        const slicedBoards = boards.slice(0, 6);
        setBoardList(slicedBoards);
      } else {
        setBoardList(boards);
      }
    }
    setIsLoading(false);
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
      <NavBar
        setBoardChange={setBoardChange}
        loadPage={loadHomePage}
        filter={filter}
        setFilter={setFilter}
        query={query}
        setQuery={setQuery}
      />
      <main className="board-page">
        <h2> Boards</h2>
        <button onClick={openCreateModal}>Create a New Board</button>
        <section className="board-list">
          {isLoading && (!boardList || boardList.length === 0) && (
            <FaSpinner className="loading" />
          )}
          {loadingError && <p>Error loading boards, please try again.</p>}
          {!isLoading && boardList.length === 0 && <p>No boards to display.</p>}
          {boardList &&
            boardList.map((board) => {
              return (
                <Board
                  setBoardChange={setBoardChange}
                  key={board.id}
                  id={board.id}
                  author={board.author}
                  title={board.title}
                  description={board.description}
                  image={board.imageURL}
                  altText={board.altText}
                  pinned={board.pinned}
                  cards={board.cards}
                />
              );
            })}
        </section>
      </main>
      {modalOpen && (
        <CreateModal
          setBoardChange={setBoardChange}
          modalType="create-board"
          reference={modalRef}
          setModalOpen={setModalOpen}
        />
      )}
    </>
  );
};

export default HomePage;
