const { PrismaClient } = require("../generated/prisma");
const prisma = new PrismaClient();

async function main() {
  const boards = [
    {
      title: "Inspiration Board",
      imageURL: "https://example.com/board1.jpg",
      description: "A board full of inspiration and ideas.",
      author: "Alex",
      altText: "A mood board with colorful sticky notes",
    },
    {
      title: "Travel Goals",
      imageURL: "https://example.com/board2.jpg",
      description: "Places I want to visit in 2025.",
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
              imageURL: "https://example.com/card1.jpg",
              description: "A cozy workspace with good lighting.",
              author: "Alex",
              altText: "A modern desk setup",
              boardId: createdBoard.id,
            },
            {
              title: "Motivational Quote",
              imageURL: "https://example.com/card2.jpg",
              description: '"Stay hungry, stay foolish."',
              author: "Alex",
              altText: "Typography quote on a wall",
              boardId: createdBoard.id,
            },
          ]
        : [
            {
              title: "Bali Beach",
              imageURL: "https://example.com/card3.jpg",
              description: "Dreaming of clear water and palm trees.",
              author: "Jamie",
              altText: "White sand beach in Bali",
              boardId: createdBoard.id,
            },
            {
              title: "Tokyo Streets",
              imageURL: "https://example.com/card4.jpg",
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
