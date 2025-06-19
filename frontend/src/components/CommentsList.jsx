import { useState, useEffect } from "react";
import Comment from "./Comment";
import "../styles/Comments.css";
import { fetchComments } from "../utils/commentUtils";
import { fetchCard } from "../utils/cardUtils";

const CommentsList = ({ boardId, cardId }) => {
  const [comments, setComments] = useState(Array());
  const [card, setCard] = useState({});

  useEffect(() => {
    getComments();
  }, []);

  const getComments = async () => {
    const loadedCard = await fetchCard(boardId, cardId);
    setCard(loadedCard);
    const loadedComments = await fetchComments(boardId, cardId);
    setComments(loadedComments);
  };

  // add Card information (using structure from Card.jsx) to modal:
  return (
    <section className="comments-modal">
      <div className="card-info">
        <h2>{card.title}</h2>
        <p>{card.description}</p>
        <img className="card-image" src={card.imageURL} alt={card.altText} />
        {card.author && <p>- {card.author}</p>}
      </div>
      <h3>Comments</h3>
      <div className="comments-list">
        {!comments || comments.length === 0 ? (
          <p>No comments to display</p>
        ) : (
          comments.map((comment) => {
            return (
              <Comment
                key={comment.id}
                text={comment.text}
                author={comment.author}
              />
            );
          })
        )}
      </div>

      <div className="create-comment">
        <h4>Add Comment:</h4>
        <form id="comment-form">
          <div className="comment-text">
            <label htmlFor="text">Comment:</label>
            <textarea type="text" id="text" name="text" required />
          </div>
          <div className="comment-author">
            <label htmlFor="author">Author (optional):</label>
            <input type="text" id="author" name="author" required />
            <button type="submit" id="comment-btn">
              Post
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default CommentsList;
