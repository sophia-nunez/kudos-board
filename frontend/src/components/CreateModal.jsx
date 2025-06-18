import { useState } from "react";
import "../styles/Modal.css";
import { fetchGifs, searchGifs } from "../utils";
import GifSelect from "./GifSelect";

const CreateModal = ({ reference }) => {
  const [selectedGif, setSelectedGif] = useState(
    "https://giphy.com/embed/tFSqMSMnzPRTAdvKyr"
  );

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
            <label htmlFor="image">Select Cover GIF: </label>
            <GifSelect setSelectedGif={setSelectedGif} />
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
