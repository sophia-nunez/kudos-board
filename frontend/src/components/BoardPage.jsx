import { useState, useEffect, useRef } from "react";
import { NavLink, useLoaderData } from "react-router";
import { IoArrowBackCircleSharp } from "react-icons/io5";
import { fetchBoardById } from "../utils/boardUtils.js";
import Card from "./Card";
import CreateModal from "./CreateModal";
import "../styles/main.css";
import "../styles/BoardPage.css";

const BoardPage = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const modalRef = useRef(null);
  let data = useLoaderData();
  const [board, setBoard] = useState({});
  const [cards, setCards] = useState(Array());
  const id = data.id;

  useEffect(() => {
    loadBoardPage();
  }, []);

  const loadBoardPage = async () => {
    const board = await fetchBoardById(id);

    setBoard(board);
    setCards(board.cards);

    // TODO: if board is empty or not found, return something to client
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
      <main>
        <div className="page-info">
          <NavLink to="/" className="back-btn" end>
            <IoArrowBackCircleSharp />
          </NavLink>
          <h2>{board.title}</h2>
          <p></p>
        </div>
        <p>{board.description}</p>
        <button onClick={openCreateModal}>Create a New Card</button>

        <section className="card-list">
          {cards &&
            cards.length > 0 &&
            cards.map((card) => {
              return (
                <Card
                  key={card.id}
                  id={card.id}
                  boardId={id}
                  title={card.title}
                  description={card.description}
                  image={card.imageURL}
                  upvotes={card.upvotes}
                  altText={card.altText}
                />
              );
            })}
        </section>
      </main>
      {modalOpen && (
        <CreateModal
          modalType="create-card"
          reference={modalRef}
          setModalOpen={setModalOpen}
        />
      )}
    </>
  );
};

export default BoardPage;
