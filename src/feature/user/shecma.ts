import { Gender } from "@prisma/client";
import { z } from "zod";

export const userShecma = z.object({
  username: z.string().nonempty({ message: "Required" }),
  password: z.string().nonempty({ message: "Required" }),
  avatar: z.string(),
  gender: z.enum([Gender.MALE, Gender.FEMALE]),
  nickname: z.string(),
  remark: z.string(),
  department: z.string(),
});
