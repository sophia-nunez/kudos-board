import { useState, useEffect } from "react";
import "../styles/Modal.css";
import GifSelect from "./GifSelect";
import { createBoard } from "../utils/boardUtils";

const AddBoard = ({ setModalOpen, setBoardChange }) => {
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    await createBoard(formInput);

    setFormInput({
      title: "",
      description: "",
      author: "",
      imageURL: selectedGif,
      altText: "",
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
        <label htmlFor="description">Category: </label>
        <select
          id="description"
          name="description"
          value={formInput.description}
          onChange={handleChange}
          required
        >
          <option value="" disabled={true}>
            Select
          </option>
          <option value="Celebration">Celebration</option>
          <option value="Thank you">Thank you</option>
          <option value="Inspiration">Inspiration</option>
        </select>
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
  );
};

export default AddBoard;
