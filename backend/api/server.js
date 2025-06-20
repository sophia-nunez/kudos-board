const express = require("express");
const cors = require("cors");
const Board = require("./board-model-prisma");
const Card = require("./card-model-prisma");

const server = express();
server.use(express.json());
server.use(cors());
// TODO: validation, incorrect shape = 422

// [GET] all boards
server.get("/boards", async (req, res, next) => {
  const search = req.query;
  try {
    // TODO check body for query params, if exist do find(body)
    const boards = await Board.find(search);
    if (boards) {
      res.json(boards);
    } else {
      next({ status: 404, message: `No boards found` });
    }
  } catch (err) {
    next(err);
  }
});

// [GET] one board by id
server.get("/boards/:id", async (req, res, next) => {
  const id = parseInt(req.params.id);
  try {
    const board = await Board.findById(id);
    if (board) {
      res.json(board);
    } else {
      next({ status: 404, message: "Board not found" });
    }
  } catch (err) {
    next(err);
  }
});

// [POST] '/'
server.post("/boards", async (req, res, next) => {
  const newBoard = req.body;
  try {
    // Validate that board has all the required fields
    const newBoardValid =
      newBoard.title !== undefined &&
      newBoard.imageURL !== undefined &&
      newBoard.description !== undefined &&
      newBoard.altText !== undefined;
    if (newBoardValid) {
      const created = await Board.create(newBoard);
      res.status(201).json(created);
    } else {
      next({
        status: 422,
        message: "title, image, description, and alt text are required",
      });
    }
  } catch (err) {
    next(err);
  }
});

// [PUT] edit board (pin)
server.put("/boards/:boardId", async (req, res, next) => {
  const boardId = Number(req.params.boardId);
  let changes = req.body;
  try {
    // Make sure the ID is valid
    const board = await Board.findById(boardId);
    // change should be upvotes
    const changesValid = changes.pinned !== undefined;

    if (changes.pinned) {
      // if pinning, set pinnedAt to now
      changes = { ...changes, pinnedAt: new Date() };
    } else {
      // otherwise set to createdAt
      changes = { ...changes, pinnedAt: board.createdAt };
    }
    if (board && changesValid) {
      const updated = await Board.update(boardId, changes);
      res.json(updated);
    } else {
      next({ status: 422, message: "Invalid ID or invalid changes" });
    }
  } catch (err) {
    next(err);
  }
});

// [DELETE] /boards/:id
server.delete("/boards/:id", async (req, res, next) => {
  const id = Number(req.params.id);
  try {
    const board = await Board.findById(id);
    if (board) {
      // TODO: also delete associated cards
      const deleted = await Board.delete(id);
      res.json(deleted);
    } else {
      next({ status: 404, message: "Board not found" });
    }
  } catch (err) {
    next(err);
  }
});

// [GET] '/boards/:id'
server.get("/boards/:boardId/cards", async (req, res, next) => {
  const boardId = Number(req.params.boardId);
  try {
    const cards = await Card.findByBoard(boardId);
    if (cards) {
      res.json(cards);
    } else {
      next({ status: 404, message: `No cards found` });
    }
  } catch (err) {
    next(err);
  }
});

// [GET] card by id
server.get("/boards/:boardId/cards/:cardId", async (req, res, next) => {
  const boardId = Number(req.params.boardId);
  const cardId = Number(req.params.cardId);
  try {
    const card = await Card.findById(boardId, cardId);
    if (card) {
      res.json(card);
    } else {
      next({ status: 404, message: "Card not found" });
    }
  } catch (err) {
    next(err);
  }
});

// [POST] '/'
server.post("/boards/:boardId/cards", async (req, res, next) => {
  const newCard = { ...req.body, boardId: Number(req.params.boardId) };
  try {
    // Validate that card has all the required fields
    const newCardValid =
      newCard.title !== undefined &&
      newCard.imageURL !== undefined &&
      newCard.description !== undefined &&
      newCard.altText !== undefined;
    if (newCardValid) {
      const created = await Card.create(newCard);
      res.status(201).json(created);
    } else {
      next({
        status: 422,
        message: "title, image, description, and alt text are required",
      });
    }
  } catch (err) {
    next(err);
  }
});

// [PUT] edit card
server.put("/boards/:boardId/cards/:cardId", async (req, res, next) => {
  const cardId = Number(req.params.cardId);
  const boardId = Number(req.params.boardId);
  const changes = req.body;
  try {
    // Make sure the ID is valid
    const card = await Card.findById(boardId, cardId);
    // change should be upvotes
    const changesValid = changes.upvotes !== undefined;
    if (card && changesValid) {
      const updated = await Card.update(cardId, changes);
      res.json(updated);
    } else {
      next({ status: 422, message: "Invalid ID or invalid changes" });
    }
  } catch (err) {
    next(err);
  }
});

// [DELETE] /boards/:id
server.delete("/boards/:boardId/cards/:cardId", async (req, res, next) => {
  const boardId = Number(req.params.boardId);
  const cardId = Number(req.params.cardId);
  try {
    const card = await Card.findById(boardId, cardId);
    if (card) {
      // TODO: also delete associated cards
      const deleted = await Card.delete(cardId);
      res.json(deleted);
    } else {
      next({ status: 404, message: "Card not found" });
    }
  } catch (err) {
    next(err);
  }
});

// POST comment
server.post(
  "/boards/:boardId/cards/:cardId/comments",
  async (req, res, next) => {
    const newComment = { ...req.body, cardId: Number(req.params.cardId) };
    try {
      // Validate that comment has all the required fields
      const newCommentValid = newComment.text !== undefined;
      if (newCommentValid) {
        const created = await Card.createComment(newComment);
        res.status(201).json(created);
      } else {
        next({
          status: 422,
          message: "text required",
        });
      }
    } catch (err) {
      next(err);
    }
  }
);

// GET comments by card
server.get(
  "/boards/:boardId/cards/:cardId/comments",
  async (req, res, next) => {
    const cardId = Number(req.params.cardId);
    try {
      const cards = await Card.findComments(cardId);
      if (cards) {
        res.json(cards);
      } else {
        next({ status: 404, message: `No cards found` });
      }
    } catch (err) {
      next(err);
    }
  }
);

// [CATCH-ALL]
server.use((req, res, next) => {
  res.status(404).json();
});

module.exports = server;
