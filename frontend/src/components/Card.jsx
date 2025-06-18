import "../styles/main.css";
import "../styles/Card.css";
import { useEffect } from "react";

const Card = ({ id, title, description, image, upvotes }) => {
  const upvoteCard = () => {
    console.log("upvoted: " + { upvotes });
  };

  return (
    <article className="card" id={`card-${id}`}>
      <h3>{title}</h3>
      <p>{description}</p>
      <img className="card-image" src={image} alt="Cover image for Card" />
      <div className="edit-buttons">
        <button onClick={upvoteCard}>Upvote: {upvotes}</button>
        <button>Delete</button>
      </div>
    </article>
  );
};

export default Card;
