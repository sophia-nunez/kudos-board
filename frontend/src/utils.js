const API_KEY = import.meta.env.VITE_API_KEY;
const giphyURL = "https://api.giphy.com/v1/gifs/";

const fetchBoards = async () => {
  // get data here, mock data for now
  try {
    const response = await fetch("../data.json");
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    const boards = data.kudosBoards;
    return boards;
  } catch (error) {
    console.error("Failed to load kudos boards:", error); // get rid of after dev
    return [];
  }
};

const fetchBoardById = async (id) => {
  const boards = await fetchBoards();
  const fetchedBoard = boards[id];

  return fetchedBoard;

  // TODO change fetch request to directly call the board id (once api setup)
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

export { fetchBoards, fetchBoardById, fetchGifs, searchGifs };
