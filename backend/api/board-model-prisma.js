// import prisma client lib and instantiate
const { PrismaClient } = require("../generated/prisma");

const prisma = new PrismaClient();

module.exports = {
  //boards
  async find(search) {
    const where = {};
    let orderBy = [{ pinned: "desc" }, { pinnedAt: "desc" }];

    if (search.title) {
      where.title = {
        contains: search.title,
        mode: "insensitive",
      };
    }

    if (search.description) {
      if (search.description === "all") {
      } else if (search.description === "Recent") {
        orderBy[0] = { createdAt: "desc" };
      } else {
        where.description = {
          contains: search.description,
        };
      }
    }

    const boards = await prisma.board.findMany({ where: where, orderBy });
    return boards;
  },

  async findById(id) {
    const board = await prisma.board.findUnique({ where: { id } });
    return board;
  },

  async create(newboard) {
    const created = await prisma.board.create({ data: newboard });
    return created;
  },

  async delete(id) {
    const deleted = await prisma.board.delete({ where: { id } });
    return deleted;
  },

  async update(id, changes) {
    const updated = await prisma.board.update({
      data: changes,
      where: { id: id },
    });
    return updated;
  },
};
