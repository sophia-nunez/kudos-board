import "../styles/Modal.css";

const CreateModal = ({ reference }) => {
  return (
    <aside id="create-modal" className="modal" ref={reference}>
      <span className="close">&times;</span>
      <section id="modal-content">
        <form id="create-form">
          <div>
            <label htmlFor="name">Title: </label>
            <input type="text" id="name" name="name" required />
          </div>
          <div>
            <label htmlFor="image">Cover: </label>
            <input
              type="file"
              id="image"
              name="image"
              accept="image/png, image/jpeg"
            />
          </div>
          <div>
            <label htmlFor="description">Description: </label>
            <input type="text" id="description" name="description" required />
          </div>
          <div>
            <label htmlFor="author">Author (optional): </label>
            <input type="text" id="author" name="author" />
          </div>

          <button type="submit">Create Board</button>
        </form>
      </section>
    </aside>
  );
};

export default CreateModal;
