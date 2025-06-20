import { useState, useEffect, useRef } from "react";
import { Link } from "react-router";
import { deleteBoard, pinBoard } from "../utils/boardUtils";
import { TiPinOutline, TiPin } from "react-icons/ti";
import { FaTrashCan } from "react-icons/fa6";
import "../styles/main.css";

const Board = ({
  id,
  author,
  title,
  description,
  image,
  altText,
  pinned,
  setBoardChange,
}) => {
  const isFirstRender = useRef(true); // avoid effect on first render
  const isPinnedFirstRender = useRef(true); // avoid effect on first render
  const [isPinned, setIsPinned] = useState(pinned);
  const [deleteId, setDeleteId] = useState(0);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
    } else {
      async function updateBoard() {
        const result = await deleteBoard(deleteId);
        setBoardChange((prev) => !prev);
        if (result === "error") {
          alert("Failed to Delete Board.");
        }
      }

      updateBoard();
    }
  }, [deleteId]);

  const handleDelete = (event) => {
    event.preventDefault();
    event.stopPropagation();
    setDeleteId(id);
  };

  useEffect(() => {
    if (isPinnedFirstRender.current) {
      isPinnedFirstRender.current = false;
    } else {
      async function updateBoard() {
        const updated = await pinBoard(id, isPinned);
        setBoardChange((prev) => !prev);
        if (updated === "error") {
          alert("Failed to pin board.");
        }
      }

      updateBoard();
    }
  }, [isPinned]);

  const togglePinned = (event) => {
    event.preventDefault();
    event.stopPropagation();
    setIsPinned((prevIsPinned) => !prevIsPinned);
  };

  return (
    <Link to={`/board/${id}`} className="board-link">
      <article className="board">
        <div className="pin-btn">
          {!isPinned ? (
            <TiPinOutline className="unpinned" onClick={togglePinned} />
          ) : (
            <p onClick={togglePinned} className="pinned">
              <TiPin /> Pinned
            </p>
          )}
        </div>
        <h3>{title}</h3>
        <img className="board-image" src={image} alt={altText} />
        <p>{description}</p>
        {author ? <p className="author-text">Created By: {author}</p> : <p />}
        <div className="edit-buttons">
          <button>View Board</button>
          <button className="delete-btn" data-id={id} onClick={handleDelete}>
            <FaTrashCan />
          </button>
        </div>
      </article>
    </Link>
  );
};

export default Board;
