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
