import cardImage from "../assets/images/placeholder.jpg";
import "../styles/main.css";

const Card = () => {
  return (
    <article className="card">
      <h3>Card Name</h3>
      <p>description</p>
      <img className="card-image" src={cardImage} alt="Cover image for Card" />
      <div className="edit-buttons">
        <button>Upvote: 0</button>
        <button>Delete</button>
      </div>
    </article>
  );
};

export default Card;
