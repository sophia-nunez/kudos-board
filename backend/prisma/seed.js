const { PrismaClient } = require("../generated/prisma");
const prisma = new PrismaClient();

async function main() {
  const boards = [
    {
      title: "Inspiration Board",
      imageURL:
        "https://media0.giphy.com/media/cG9074eybq6OdTLNbO/giphy.gif?cid=e0ccb6ebek8popwjpomj6z753jojod51sydqbykdz8k17yvj&ep=v1_gifs_trending&rid=giphy.gif&ct=g",
      description: "Inspiration",
      author: "Alex",
      altText: "A mood board with colorful sticky notes",
    },
    {
      title: "Travel Goals",
      imageURL:
        "https://media1.giphy.com/media/Lv2VhwHrt6ljhvZ6LF/giphy.gif?cid=e0ccb6ebek8popwjpomj6z753jojod51sydqbykdz8k17yvj&ep=v1_gifs_trending&rid=giphy.gif&ct=g",
      description: "Celebration",
      author: "Jamie",
      altText: "A vision board with travel photos",
    },
  ];

  for (const board of boards) {
    const createdBoard = await prisma.board.create({ data: board });

    // Create cards for this board
    const cards =
      createdBoard.title === "Inspiration Board"
        ? [
            {
              title: "Creative Workspace",
              imageURL:
                "https://media0.giphy.com/media/jNdoPsOedksxc3Fx2a/giphy.gif?cid=e0ccb6ebek8popwjpomj6z753jojod51sydqbykdz8k17yvj&ep=v1_gifs_trending&rid=giphy.gif&ct=g",
              description: "A cozy workspace with good lighting.",
              author: "Alex",
              altText: "A modern desk setup",
              boardId: createdBoard.id,
            },
            {
              title: "Motivational Quote",
              imageURL:
                "https://media4.giphy.com/media/l1KVaj5UcbHwrBMqI/giphy.gif?cid=e0ccb6ebek8popwjpomj6z753jojod51sydqbykdz8k17yvj&ep=v1_gifs_trending&rid=giphy.gif&ct=g",
              description: '"Stay hungry, stay foolish."',
              author: "Alex",
              altText: "Typography quote on a wall",
              boardId: createdBoard.id,
            },
          ]
        : [
            {
              title: "Bali Beach",
              imageURL:
                "https://media1.giphy.com/media/XtRvzREebFfmIBCNMh/giphy.gif?cid=e0ccb6ebek8popwjpomj6z753jojod51sydqbykdz8k17yvj&ep=v1_gifs_trending&rid=giphy.gif&ct=g",
              description: "Dreaming of clear water and palm trees.",
              author: "Jamie",
              altText: "White sand beach in Bali",
              boardId: createdBoard.id,
            },
            {
              title: "Tokyo Streets",
              imageURL:
                "https://media2.giphy.com/media/6PeNedY2QRivEooYHJ/giphy.gif?cid=e0ccb6ebek8popwjpomj6z753jojod51sydqbykdz8k17yvj&ep=v1_gifs_trending&rid=giphy.gif&ct=g",
              description: "Wandering around Shibuya at night.",
              author: "Jamie",
              altText: "Busy Tokyo crosswalk at night",
              boardId: createdBoard.id,
            },
          ];

    for (const card of cards) {
      await prisma.card.create({ data: card });
    }
  }

  console.log("🌱 Seeded boards and cards!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
