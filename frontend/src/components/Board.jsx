import { useState } from "react";
import { Link } from "react-router";
import { deleteBoard, pinBoard } from "../utils/boardUtils";
import { TiPinOutline, TiPin } from "react-icons/ti";
import "../styles/main.css";
import { useRef } from "react";
import { useEffect } from "react";

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
  const [isPinned, setIsPinned] = useState(pinned);

  const handleDelete = (event) => {
    event.stopPropagation();
    const id = event.target.dataset.id;
    const result = deleteBoard(id);
    setBoardChange((prev) => !prev);
  };

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
    } else {
      const updated = pinBoard(id, isPinned);
      if (updated !== "error") {
        setBoardChange((prev) => !prev);
      } else {
        console.log("error occured");
        // TODO: add error handling for client, setIsError which renders message
      }
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
          <button data-id={id} onClick={handleDelete}>
            Delete Board
          </button>
        </div>
      </article>
    </Link>
  );
};

export default Board;
