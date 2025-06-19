import Comment from "./Comment";
import "../styles/Comments.css";

const CommentsList = ({ comments }) => {
  return (
    <section className="comments-modal">
      <h2>Comments</h2>
      <div className="comments-list">
        <Comment />
        <Comment />
        <Comment />
      </div>

      <form className="create-comment">
        <h4>Add Comment:</h4>
        <div>
          <label htmlFor="author">Author (optional):</label>
          <input type="text" id="author" name="author" required />
          <label htmlFor="text">Comment:</label>
          <input type="text" id="text" name="text" required />
        </div>
        <button type="submit" id="comment-btn">
          Post
        </button>
      </form>
    </section>
  );
};

export default CommentsList;
