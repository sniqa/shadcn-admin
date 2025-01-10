import { z } from "zod";

export const userShecma = z.object({
  username: z.string().nonempty({ message: "Required" }),
  password: z.string().nonempty({ message: "Required" }),
});
