import { Prisma } from "@prisma/client";
import { z } from "zod";
import { userShecma } from "./shecma";

export type UserShecma = z.infer<typeof userShecma>;

export type UserModel = Prisma.UserGetPayload<{
  omit: { password: true };
}>;
