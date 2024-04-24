// import { PrismaClient } from "@prisma/client";
const {PrismaClient}=require("@prisma/client")

const database = new PrismaClient();

async function main() {
  try {
    await database.category.createMany({
      data: [
        {
          name: "computer science",
        },
        {
          name: "mathematics",
        },
        {
          name: "music",
        },
        {
          name: "art",
        },
        {
          name: "fitness",
        },
        {
          name: "health",
        },
        {
          name: "politics",
        },
      ],
    });
    console.log("success");
  } catch (error) {
    console.log(error);
  }
}
main()