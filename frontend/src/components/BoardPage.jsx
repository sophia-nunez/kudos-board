import { useState, useEffect, useRef } from "react";
import { NavLink, useLoaderData } from "react-router";
import { IoArrowBackCircleSharp } from "react-icons/io5";
import { fetchBoardById } from "../utils/boardUtils.js";
import { FaSpinner } from "react-icons/fa6";
import Card from "./Card";
import CreateModal from "./CreateModal";
import "../styles/main.css";
import "../styles/BoardPage.css";

const BoardPage = () => {
  let data = useLoaderData();
  const [isLoading, setIsLoading] = useState(true);
  const [cardsChange, setCardsChange] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalType, setModalType] = useState("");
  const modalRef = useRef(null);
  const [board, setBoard] = useState({});
  const [cards, setCards] = useState(Array());
  const id = data.id;
  const [cardId, setCardId] = useState(0);

  useEffect(() => {
    loadBoardPage();
  }, [cardsChange]);

  const loadBoardPage = async () => {
    setIsLoading(true);
    const board = await fetchBoardById(id);
    setIsLoading(false);

    setBoard(board);
    setCards(board.cards);

    // TODO: if board is empty or not found, return something to client
  };

  const openCreateModal = () => {
    setModalType("create-card");
    setModalOpen(true);
  };

  const openCommentModal = (givenId) => {
    setModalType("comments");
    setCardId(givenId);
    setModalOpen(true);

    // fetch comments for that card and  set state
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
          <div className="back-btn" />
        </div>
        {board.author && (
          <p className="author-text">Created By: {board.author}</p>
        )}
        <p>{board.description}</p>
        <button onClick={openCreateModal}>Create a New Card</button>

        <section className="card-list">
          {!isLoading && (!cards || (cards && cards.length === 0)) && (
            <p>
              <br />
              No cards to display.
            </p>
          )}
          {isLoading && cards && cards.length === 0 && (
            <FaSpinner className="loading" />
          )}
          {cards &&
            cards.length > 0 &&
            cards.map((card) => {
              return (
                <Card
                  setCardsChange={setCardsChange}
                  openCommentModal={openCommentModal}
                  key={card.id}
                  id={card.id}
                  boardId={id}
                  title={card.title}
                  description={card.description}
                  image={card.imageURL}
                  author={card.author}
                  upvotes={card.upvotes}
                  altText={card.altText}
                />
              );
            })}
        </section>
      </main>
      {modalOpen && (
        <CreateModal
          setBoardChange={setCardsChange}
          boardId={id}
          cardId={cardId}
          modalType={modalType}
          reference={modalRef}
          setModalOpen={setModalOpen}
        />
      )}
    </>
  );
};

export default BoardPage;
