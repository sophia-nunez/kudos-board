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
  const [modalType, setModalType] = useState("");
  const modalRef = useRef(null);
  let data = useLoaderData();
  const [board, setBoard] = useState({});
  const [cards, setCards] = useState(Array());
  const [comments, setComments] = useState(Array());
  const id = data.id;
  const [cardId, setCardId] = useState(0);

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
                  openCommentModal={openCommentModal}
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
