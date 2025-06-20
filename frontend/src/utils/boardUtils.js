const API_KEY = import.meta.env.VITE_API_KEY;
const giphyURL = "https://api.giphy.com/v1/gifs/";
const boardURL = import.meta.env.VITE_DB_URL;

// const fetchBoards = async () => {
//   // get data here, mock data for now
//   try {
//     const response = await fetch(boardURL);
//     if (!response.ok) {
//       throw new Error(`HTTP error! status: ${response.status}`);
//     }
//     const boards = await response.json();
//     return boards;
//   } catch (error) {
//     console.error("Failed to load kudos boards:", error); // get rid of after dev
//     return [];
//   }
// };
const fetchBoards = async (query) => {
  try {
    const response = await fetch(`${boardURL}?${query.toString()}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const boards = await response.json();
    return boards;
  } catch (error) {
    return "error";
  }
};

const fetchBoardById = async (id) => {
  try {
    const response = await fetch(`${boardURL}/${id}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    let board = await response.json();

    // get cards
    const res = await fetch(`${boardURL}/${id}/cards`);
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
    const response = await fetch(`${boardURL}/${id}`, {
      method: "DELETE",
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
  } catch (error) {
    console.error("Failed to create board:", error); // get rid of after dev
  }
};

const pinBoard = async (id, isPinned) => {
  try {
    const changes = { pinned: isPinned };
    const response = await fetch(`${boardURL}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(changes),
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const board = await response.json();
    return board;
  } catch (error) {
    return "error";
  }
};

export {
  fetchBoardById,
  fetchGifs,
  searchGifs,
  createBoard,
  deleteBoard,
  fetchBoards,
  pinBoard,
};
