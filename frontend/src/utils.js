const API_KEY = import.meta.env.VITE_API_KEY;
const giphyURL = "https://api.giphy.com/v1/gifs/";
const boardURL = "http://localhost:3000";

const fetchBoards = async () => {
  // get data here, mock data for now
  try {
    const response = await fetch(boardURL);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const boards = await response.json();
    return boards;
  } catch (error) {
    console.error("Failed to load kudos boards:", error); // get rid of after dev
    return [];
  }
};

const fetchBoardById = async (id) => {
  try {
    const response = await fetch(`${boardURL}/board/${id}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    let board = await response.json();

    // get cards
    const res = await fetch(`${boardURL}/board/${id}/cards`);
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const cards = await res.json();

    board = { ...board, cards: cards };
    return board;
  } catch (error) {
    console.error(`Failed to load board: ${id}`, error); // get rid of after dev
    return {};
  }
  // TODO add in error handling as needed
};

const fetchGifs = async () => {
  try {
    const response = await fetch(
      `${giphyURL}trending?api_key=${API_KEY}&tag=&rating=g&limit=15`
    );
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const gifs = await response.json();
    return gifs.data;
  } catch (error) {
    console.error("Failed to load kudos boards:", error); // get rid of after dev
    return [];
  }
};

const searchGifs = async (query) => {
  try {
    const response = await fetch(
      `${giphyURL}search?api_key=${API_KEY}&q=${query}&limit=10`
    );
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const gifs = await response.json();
    return gifs.data;
  } catch (error) {
    console.error("Failed to load kudos boards:", error); // get rid of after dev
    return [];
  }
};

const createBoard = async (formInput) => {
  try {
    const response = await fetch(boardURL, {
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
    console.error("Failed to create board:", error); // get rid of after dev
  }
};

const deleteBoard = async (id) => {
  try {
    const response = await fetch(`${boardURL}/board/${id}`, {
      method: "DELETE",
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
  } catch (error) {
    console.error("Failed to create board:", error); // get rid of after dev
  }
};

const createCard = (formInput) => {
  console.log("card created");
};

export {
  fetchBoards,
  fetchBoardById,
  fetchGifs,
  searchGifs,
  createBoard,
  deleteBoard,
  createCard,
};
