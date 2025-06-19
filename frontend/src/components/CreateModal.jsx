import { useState, useEffect } from "react";
import "../styles/Modal.css";
import { fetchGifs, searchGifs } from "../utils/boardUtils";
import GifSelect from "./GifSelect";
import { createBoard } from "../utils/boardUtils";
import { createCard } from "../utils/cardUtils";
import AddBoard from "./AddBoard";
import AddCard from "./AddCard";
import CommentsList from "./CommentsList";

const CreateModal = ({ modalType, reference, setModalOpen, boardId }) => {
  return (
    <aside id="create-modal" className="modal" ref={reference}>
      <span className="close">&times;</span>
      <section id="modal-content">
        {modalType === "create-board" && (
          <AddBoard modalType={modalType} setModalOpen={setModalOpen} />
        )}
        {modalType === "create-card" && (
          <AddCard boardId={boardId} setModalOpen={setModalOpen} />
        )}
        {modalType === "comments" && <CommentsList />}
      </section>
    </aside>
  );
};

export default CreateModal;
