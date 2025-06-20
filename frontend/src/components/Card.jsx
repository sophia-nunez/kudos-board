import "../styles/main.css";
import "../styles/Card.css";
import { deleteCard, editCard } from "../utils/cardUtils";
import { useState } from "react";
import { FaTrashCan } from "react-icons/fa6";

const Card = ({
  id,
  boardId,
  title,
  description,
  image,
  altText,
  author,
  upvotes,
  openCommentModal,
  setCardsChange,
}) => {
  const [displayedUpvotes, setDisplayedUpvotes] = useState(parseInt(upvotes));

  const upvoteCard = async (e) => {
    e.stopPropagation();
    const newVotes = displayedUpvotes + 1;
    setDisplayedUpvotes(newVotes);
    await editCard(boardId, id, { upvotes: newVotes });
    setCardsChange((prev) => !prev);
  };

  const handleDelete = async (e) => {
    e.stopPropagation();
    await deleteCard(boardId, id);
    setCardsChange((prev) => !prev);
  };

  return (
    <article
      className="card"
      id={`card-${id}`}
      onClick={() => openCommentModal(id)}
    >
      <h3>{title}</h3>
      <p>{description}</p>
      <img className="card-image" src={image} alt={altText} />
      {author && <p>{author}</p>}
      <div className="edit-buttons">
        <button onClick={upvoteCard}>Upvote: {displayedUpvotes}</button>
        <button className="delete-btn" onClick={handleDelete}>
          <FaTrashCan />
        </button>
      </div>
    </article>
  );
};

export default Card;
