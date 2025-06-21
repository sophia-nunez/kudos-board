import { useState, useEffect } from "react";
import "../styles/Modal.css";
import GifSelect from "./GifSelect";
import { createBoard } from "../utils/boardUtils";

const AddBoard = ({ setModalOpen, setBoardChange }) => {
  const defaultGif =
    "https://media2.giphy.com/media/tFSqMSMnzPRTAdvKyr/giphy.gif?cid=e0ccb6eb6vanvn4upa76ylcmvwvp70a6599e2vlblxoxqe51&ep=v1_gifs_gifId&rid=giphy.gif&ct=g";
  const defaultAlt = "Default GIF for board cover";
  const [selectedGif, setSelectedGif] = useState({
    gifURL: defaultGif,
    gifAlt: defaultAlt,
  });
  const [formInput, setFormInput] = useState({
    title: "",
    description: "",
    author: "",
    imageURL: selectedGif.gifURL,
    altText: selectedGif.gifAlt,
  });

  // update form value when gif is changed
  useEffect(() => {
    setFormInput((prev) => ({
      ...prev,
      imageURL: selectedGif.gifURL,
      altText: selectedGif.gifAlt,
    }));
  }, [selectedGif]);

  // creates board, triggers render, and closes modal
  const handleSubmit = async (e) => {
    e.preventDefault();

    await createBoard(formInput);

    setFormInput({
      title: "",
      description: "",
      author: "",
      imageURL: defaultGif,
      altText: defaultAlt,
    });

    setBoardChange((prev) => !prev);
    setModalOpen(false);
  };

  // when any input is changed, updates respective value
  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormInput((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <div className="create-form">
      <h1>Create Board</h1>
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
          <GifSelect
            setSelectedGif={setSelectedGif}
            defaultGif={defaultGif}
            defaultAlt={defaultAlt}
          />
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
    </div>
  );
};

export default AddBoard;
