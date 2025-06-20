import { useState, useEffect } from "react";
import "../styles/Modal.css";
import GifSelect from "./GifSelect";
import { createCard } from "../utils/cardUtils";

const AddCard = ({ setModalOpen, boardId, setBoardChange }) => {
  const defaultAlt = "Default GIF for board cover";
  const [selectedGif, setSelectedGif] = useState({
    gifURL: "",
    gifAlt: defaultAlt,
  });
  const [formInput, setFormInput] = useState({
    boardId,
    title: "",
    description: "",
    author: "",
    imageURL: "",
    altText: "Cover image for Card",
  });

  useEffect(() => {
    setFormInput((prev) => ({
      ...prev,
      imageURL: selectedGif.gifURL,
      altText: selectedGif.gifAlt,
    }));
  }, [selectedGif]);

  const handleSubmit = (e) => {
    const form = document.getElementById("create-form");
    const gifInput = form.querySelector(
      'input[type="hidden"][name="gifSelect"]'
    ); // find the hidden input

    if (!gifInput.value) {
      e.preventDefault(); // stop submission
      alert("Select a GIF before creating.");
      return;
    }

    e.preventDefault();

    createCard(formInput);

    setFormInput({
      title: "",
      description: "",
      author: "",
      imageURL: "",
      altText: defaultAlt,
    });

    setBoardChange((prev) => !prev);
    setModalOpen(false);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormInput((prevData) => ({
      ...prevData, // keep data but replace target value
      [name]: value,
    }));
  };

  return (
    <div className="create-form">
      <h1>Create Card</h1>
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
        <div className="gif-container">
          <label htmlFor="gifSelect">Select Cover GIF: </label>
          <input
            type="hidden"
            id="gifSelect"
            name="gifSelect"
            value={selectedGif.gifURL}
            required
          />
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

        <button type="submit">Create Card</button>
      </form>
    </div>
  );
};

export default AddCard;
