import { useState, useEffect } from "react";
import "../styles/Modal.css";
import { fetchGifs, searchGifs } from "../utils";
import GifSelect from "./GifSelect";
import { createBoard, createCard } from "../utils";

const CreateModal = ({ modalType, reference, setModalOpen }) => {
  const [selectedGif, setSelectedGif] = useState(
    "https://giphy.com/embed/tFSqMSMnzPRTAdvKyr"
  );
  const [formInput, setFormInput] = useState({
    title: "",
    description: "",
    author: "",
    imageURL: selectedGif,
    altText: "GIF for board cover",
  });

  useEffect(() => {
    setFormInput((prev) => ({
      ...prev,
      imageURL: selectedGif,
    }));
  }, [selectedGif]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (modalType === "create-board") {
      createBoard(formInput);
    } else {
      createCard(formInput);
    }

    setFormInput({
      title: "",
      description: "",
      author: "",
      imageURL: selectedGif,
      altText: "",
    });

    setModalOpen(false);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormInput((prevData) => ({
      ...prevData, // keep data but replace target value
      [name]: value,
    }));
  };

  // then send push request
  return (
    <aside id="create-modal" className="modal" ref={reference}>
      <span className="close">&times;</span>
      <section id="modal-content">
        <form id="create-form" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="name">Title: </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formInput.title}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label>Select Cover GIF: </label>
            <GifSelect setSelectedGif={setSelectedGif} />
          </div>
          <div>
            <label htmlFor="description">Description: </label>
            <input
              type="text"
              id="description"
              name="description"
              value={formInput.description}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label htmlFor="author">Author (optional): </label>
            <input
              type="text"
              id="author"
              name="author"
              value={formInput.author}
              onChange={handleChange}
            />
          </div>

          <button type="submit">Create Board</button>
        </form>
      </section>
    </aside>
  );
};

export default CreateModal;
