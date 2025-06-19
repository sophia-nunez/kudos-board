import { useState, useEffect } from "react";
import Comment from "./Comment";
import "../styles/Comments.css";
import { fetchComments } from "../utils/commentUtils";

const CommentsList = ({ boardId, cardId }) => {
  const [comments, setComments] = useState(Array());

  useEffect(() => {
    getComments();
  }, []);

  const getComments = async () => {
    const loadedComments = await fetchComments(boardId, cardId);
    setComments(loadedComments);
  };

  return (
    <section className="comments-modal">
      <h2>Comments</h2>
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
