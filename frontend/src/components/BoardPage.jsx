import { useState, useEffect } from "react";
import { NavLink, useLoaderData } from "react-router";
import { IoArrowBackCircleSharp } from "react-icons/io5";
import Card from "./Card";
import { fetchBoardById } from "../utils/boardUtils.js";
import { deleteCard } from "../utils/cardUtils.js";
import "../styles/main.css";
import "../styles/BoardPage.css";

const BoardPage = () => {
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

  const handleDelete = (e, cardId) => {
    deleteCard(id, cardId);
    console.log("deleted card " + cardId + " from board " + id);
  };

  return (
    <main>
      <div className="page-info">
        <NavLink to="/" className="back-btn" end>
          <IoArrowBackCircleSharp />
        </NavLink>
        <h2>{board.title}</h2>
        <p></p>
      </div>
      <p>{board.description}</p>
      <section className="card-list">
        {cards &&
          cards.length > 0 &&
          cards.map((card) => {
            return (
              <Card
                key={card.id}
                id={card.id}
                title={card.title}
                description={card.description}
                image={card.imageURL}
                upvotes={card.upvotes}
                handleDelete={handleDelete}
              />
            );
          })}
      </section>
    </main>
  );
};

export default BoardPage;
