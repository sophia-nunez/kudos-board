const { PrismaClient } = require("../generated/prisma"); // or "@prisma/client" if you're not using a custom path
const prisma = new PrismaClient();

async function main() {
  const boards = [
    {
      title: "Inspiration Board",
      imageURL: "https://media0.giphy.com/media/cG9074eybq6OdTLNbO/giphy.gif",
      description: "Inspiration",
      author: "Alex",
      altText: "A mood board with colorful sticky notes",
      pinned: false,
    },
    {
      title: "Travel Goals",
      imageURL: "https://media1.giphy.com/media/Lv2VhwHrt6ljhvZ6LF/giphy.gif",
      description: "Celebration",
      author: "Jamie",
      altText: "A vision board with travel photos",
      pinned: false,
    },
  ];

  for (const board of boards) {
    const createdBoard = await prisma.board.create({ data: board });

    const cardsData =
      createdBoard.title === "Inspiration Board"
        ? [
            {
              title: "Creative Workspace",
              imageURL:
                "https://media0.giphy.com/media/jNdoPsOedksxc3Fx2a/giphy.gif",
              description: "A cozy workspace with good lighting.",
              author: "Alex",
              altText: "A modern desk setup",
              boardId: createdBoard.id,
              upvotes: 5,
            },
            {
              title: "Motivational Quote",
              imageURL:
                "https://media4.giphy.com/media/l1KVaj5UcbHwrBMqI/giphy.gif",
              description: '"Stay hungry, stay foolish."',
              author: "Alex",
              altText: "Typography quote on a wall",
              boardId: createdBoard.id,
              upvotes: 3,
            },
          ]
        : [
            {
              title: "Bali Beach",
              imageURL:
                "https://media1.giphy.com/media/XtRvzREebFfmIBCNMh/giphy.gif",
              description: "Dreaming of clear water and palm trees.",
              author: "Jamie",
              altText: "White sand beach in Bali",
              boardId: createdBoard.id,
              upvotes: 10,
            },
            {
              title: "Tokyo Streets",
              imageURL:
                "https://media2.giphy.com/media/6PeNedY2QRivEooYHJ/giphy.gif",
              description: "Wandering around Shibuya at night.",
              author: "Jamie",
              altText: "Busy Tokyo crosswalk at night",
              boardId: createdBoard.id,
              upvotes: 7,
            },
          ];

    for (const card of cardsData) {
      const createdCard = await prisma.card.create({ data: card });

      // Add a simple comment to each card
      await prisma.comment.create({
        data: {
          text: "Nice!",
          author: "SeedBot",
          cardId: createdCard.id,
        },
      });
    }
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
