const API_KEY = import.meta.env.VITE_API_KEY;
const giphyURL = "https://api.giphy.com/v1/gifs/";
const boardURL = "http://localhost:3000/boards";

// fetchCards
const fetchCards = async (boardId) => {
  try {
    const response = await fetch(`${boardURL}/${boardId}/cards`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const cards = await response.json();
    return cards;
  } catch (error) {
    console.error("Failed to load kudos cards for board:", error); // get rid of after dev
    return [];
  }
};

// fetchCard
const fetchCard = async (boardId, cardId) => {
  try {
    const response = await fetch(`${boardURL}/${boardId}/cards/${cardId}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const card = await response.json();
    return card;
  } catch (error) {
    console.error("Failed to load card:", error); // get rid of after dev
    return [];
  }
};

// deleteCard
const deleteCard = async (boardId, cardId) => {
  try {
    const response = await fetch(`${boardURL}/${boardId}/cards/${cardId}`, {
      method: "DELETE",
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const card = await response.json();
    return card;
  } catch (error) {
    console.error("Failed to delete kudos cards for board:", error); // get rid of after dev
    return [];
  }
};

// editCard

const createCard = (formInput) => {
  console.log("card created");
};

export { fetchCards, fetchCard, deleteCard, createCard };
