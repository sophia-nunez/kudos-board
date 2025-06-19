import { useState, useEffect } from "react";

const Comment = ({ text, author }) => {
  const [authorDisplay, setAuthorDisplay] = useState(author);

  useEffect(() => {
    if (!author) {
      setAuthorDisplay("Anonymous");
    }
  }, []);
  return (
    <article className="comment">
      <p className="comment-icon">👾</p>
      <article className="comment-body">
        <h3>{authorDisplay}</h3>
        <p>{text}</p>
      </article>
    </article>
  );
};

export default Comment;
