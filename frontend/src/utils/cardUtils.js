const API_KEY = import.meta.env.VITE_API_KEY;
const giphyURL = "https://api.giphy.com/v1/gifs/";
import { boardURL } from "./boardUtils";

// fetchCards
const fetchCards = async (boardId) => {
  try {
    const response = await fetch(`${boardURL()}/${boardId}/cards`);
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
    const response = await fetch(`${boardURL()}/${boardId}/cards/${cardId}`);
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
    const response = await fetch(`${boardURL()}/${boardId}/cards/${cardId}`, {
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
const editCard = async (boardId, cardId, changes) => {
  try {
    const response = await fetch(`${boardURL()}/${boardId}/cards/${cardId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(changes),
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
  } catch (error) {
    console.error("Failed to update card:", error); // get rid of after dev
  }
};

const createCard = async (formInput) => {
  const boardId = formInput.boardId;
  try {
    const response = await fetch(`${boardURL()}/${boardId}/cards/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formInput),
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
  } catch (error) {
    console.error("Failed to create card:", error); // get rid of after dev
  }
};

export { fetchCards, fetchCard, deleteCard, editCard, createCard };
