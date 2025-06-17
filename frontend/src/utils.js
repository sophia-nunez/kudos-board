const fetchBoards = async () => {
  // get data here, mock data for now
  try {
    const response = await fetch("../public/data.json");
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

export { fetchBoards, fetchBoardById };
