const API_KEY = import.meta.env.VITE_API_KEY;
const giphyURL = "https://api.giphy.com/v1/gifs/";
const dbURL = import.meta.env.VITE_DB_URL;

const fetchComments = async (boardId, cardId) => {
  try {
    const response = await fetch(
      `${dbURL}/${boardId}/cards/${cardId}/comments`
    );
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const comments = await response.json();
    return comments;
  } catch (error) {
    console.error("Failed to load kudos cards for board:", error); // get rid of after dev
    return [];
  }
};

const createComment = async (boardId, formInput) => {
  const cardId = formInput.cardId;
  try {
    const response = await fetch(
      `${dbURL}/${boardId}/cards/${cardId}/comments`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formInput),
      }
    );
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
  } catch (error) {
    console.error("Failed to create comment:", error); // get rid of after dev
  }
};

export { fetchComments, createComment };
