const express = require("express");
const cors = require("cors");
const Board = require("./board-model-prisma");
const Card = require("./card-model-prisma");

const server = express();
server.use(express.json());
server.use(cors());

// [GET] '/'
server.get("/boards", async (req, res, next) => {
  const search = req.query;
  try {
    // TODO check body for query params, if exist do find(body)
    const boards = await Board.find(search);
    if (boards.length) {
      res.json(boards);
    } else {
      next({ status: 404, message: `No boards found` });
    }
  } catch (err) {
    next(err);
  }
});

// [GET] /boards/:id
server.get("/boards/:id", async (req, res, next) => {
  const id = parseInt(req.params.id);
  console.log("id", req.params);
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
server.get("/boards/:id/cards", async (req, res, next) => {
  const boardId = Number(req.params.id);
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

// [GET] /boards/:id
server.get("/boards/:id/cards/:cardId", async (req, res, next) => {
  const boardId = Number(req.params.id);
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
server.post("/boards/:id/cards", async (req, res, next) => {
  const newCard = { ...req.body, boardId: req.params.id };
  try {
    // Validate that board has all the required fields
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

// [DELETE] /boards/:id
server.delete("/boards/:id/cards/:cardId", async (req, res, next) => {
  const id = Number(req.params.id);
  try {
    const board = await Card.findById(id);
    if (board) {
      // TODO: also delete associated cards
      const deleted = await Card.delete(id);
      res.json(deleted);
    } else {
      next({ status: 404, message: "Card not found" });
    }
  } catch (err) {
    next(err);
  }
});

// [CATCH-ALL]
server.use((req, res, next) => {
  next({ status: 404, message: "poop" });
});

module.exports = server;
