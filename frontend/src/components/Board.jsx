import { useState, useEffect, useRef } from "react";
import { Link } from "react-router";
import { deleteBoard, pinBoard } from "../utils/boardUtils";
import { TiPinOutline, TiPin } from "react-icons/ti";
import "../styles/main.css";

const Board = ({
  id,
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
          console.log("error occured");
          // handle error here
        }
      }

      updateBoard();
    }
  }, [deleteId]);

  const handleDelete = (event) => {
    event.preventDefault();
    event.stopPropagation();
    const selectedId = event.target.dataset.id;
    setDeleteId(selectedId);
  };

  useEffect(() => {
    if (isPinnedFirstRender.current) {
      isPinnedFirstRender.current = false;
    } else {
      async function updateBoard() {
        console.log("pinboard fault");
        const updated = await pinBoard(id, isPinned);
        setBoardChange((prev) => !prev);
        if (updated === "error") {
          console.log("error occured");
          // handle error here
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
  // TODO: check propagation on ALL delete buttons

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
        <img className="board-image" src={image} alt={altText} />
        <h3>{title}</h3>
        <p>{description}</p>
        <div className="edit-buttons">
          <button>View Board</button>
          <button className="delete-btn" data-id={id} onClick={handleDelete}>
            Delete Board
          </button>
        </div>
      </article>
    </Link>
  );
};

export default Board;
