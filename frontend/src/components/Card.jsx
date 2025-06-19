import "../styles/main.css";
import "../styles/Card.css";
import { useEffect } from "react";
import { deleteCard, editCard } from "../utils/cardUtils";
import { useState } from "react";

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
}) => {
  const [displayedUpvotes, setDisplayedUpvotes] = useState(parseInt(upvotes));

  const upvoteCard = async () => {
    const newVotes = displayedUpvotes + 1;
    setDisplayedUpvotes(newVotes);
    await editCard(boardId, id, { upvotes: newVotes });
  };

  const handleDelete = (e) => {
    deleteCard(boardId, id);
    console.log("deleted card " + cardId + " from board " + id);
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
        <button onClick={handleDelete}>Delete</button>
      </div>
    </article>
  );
};

export default Card;
