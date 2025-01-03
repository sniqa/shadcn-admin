import { prisma } from "./db";
import { find_network } from "./controllers/network";

console.log(await prisma.network.findMany());
console.log(
  await find_network({
    where: { parentId: null },
    include: { children: true },
  })
);
