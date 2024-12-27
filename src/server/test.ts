import { create_network } from "./controllers/network";

console.log(
  await create_network({
    name: "test",
    parentId: null,
  })
);
