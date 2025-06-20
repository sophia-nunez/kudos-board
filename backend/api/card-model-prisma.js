// import prisma client lib and instantiate
const { PrismaClient } = require("../generated/prisma");

const prisma = new PrismaClient();

module.exports = {
  // cards
  async findByBoard(boardId) {
    const orderBy = [{ upvotes: "desc" }, { createdAt: "desc" }];

    const cards = await prisma.card.findMany({ where: { boardId }, orderBy });
    return cards;
  },

  async findById(boardId, id) {
    const card = await prisma.card.findUnique({ where: { boardId, id } });
    return card;
  },

  async create(newCard) {
    const created = await prisma.card.create({ data: newCard });
    return created;
  },

  async update(id, changes) {
    const updated = await prisma.card.update({
      data: changes,
      where: { id: id },
    });
    return updated;
  },

  async delete(id) {
    const deleted = await prisma.card.delete({ where: { id } });
    return deleted;
  },

  async findComments(cardId) {
    const orderBy = [{ createdAt: "desc" }];

    const comments = await prisma.comment.findMany({
      where: { cardId },
      orderBy,
    });
    return comments;
  },

  async createComment(newCard) {
    const comment = await prisma.comment.create({ data: newCard });
    return comment;
  },
};
