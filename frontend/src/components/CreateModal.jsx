import "../styles/Modal.css";
import AddBoard from "./AddBoard";
import AddCard from "./AddCard";
import CommentsList from "./CommentsList";

const CreateModal = ({
  modalType,
  reference,
  setModalOpen,
  setBoardChange,
  boardId,
  cardId,
}) => {
  return (
    <aside id="create-modal" className="modal" ref={reference}>
      <span className="close">&times;</span>
      <section id="modal-content">
        {modalType === "create-board" && (
          <AddBoard
            setBoardChange={setBoardChange}
            modalType={modalType}
            setModalOpen={setModalOpen}
          />
        )}
        {modalType === "create-card" && (
          <AddCard
            setBoardChange={setBoardChange}
            boardId={boardId}
            setModalOpen={setModalOpen}
          />
        )}
        {modalType === "comments" && (
          <CommentsList boardId={boardId} cardId={cardId} />
        )}
      </section>
    </aside>
  );
};

export default CreateModal;
