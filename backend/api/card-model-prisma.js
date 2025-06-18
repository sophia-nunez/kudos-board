// import prisma client lib and instantiate
const { PrismaClient } = require("../generated/prisma");

const prisma = new PrismaClient();

module.exports = {
  // cards
  async findByBoard(boardId) {
    const cards = await prisma.card.findMany({ where: { boardId } });
    return cards;
  },

  async findById(boardId, cardId) {
    const cards = await prisma.card.findUnique({ where: { boardId, cardId } });
    return card;
  },

  async create(newCard) {
    const created = await prisma.card.create({ data: newCard });
    return created;
  },

  async delete(id) {
    const deleted = await prisma.card.delete({ where: { id } });
    return deleted;
  },
};
