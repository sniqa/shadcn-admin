import { faildResult, successResult } from "@/server/result";
import { userShecma } from "@/types/user";
import { z } from "zod";

export const login = async (data: z.infer<typeof userShecma>) => {
  const { error, success } = userShecma.safeParse(data);

  if (!success) {
    return faildResult(error.message);
  }

  if (data.username.trim() === "admin" && data.password.trim() === "123") {
    return successResult("login success");
  } else {
    return faildResult("login faild");
  }
};
