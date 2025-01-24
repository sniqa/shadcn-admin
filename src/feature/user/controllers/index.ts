import { faildResult, successResult } from "@/server/result";
import { UserModel } from "../types";
import { userShecma } from "../shecma";
import { z } from "zod";
import { prisma } from "@/server/db";

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

// CREATE
export const create_user = async (data: UserModel) => {
  const { error, success } = userShecma.safeParse(data);
  if (!success) {
    return faildResult(error.message);
  }

  if (await prisma.user.findUnique({ where: { username: data.username } })) {
    return faildResult("user already have");
  }

  const user = await prisma.user.create({ data });

  return successResult(user);
};

// find
export const find_users = async () => {
  return successResult(await prisma.user.findMany());
};

// delete
export const delete_user = async (data: UserModel) => {
  return successResult(await prisma.user.delete({ where: { id: data.id } }));
};

// update
export const update_user = async (data: UserModel) => {
  const { id, ...rest } = data;

  const result = await prisma.user.update({
    where: { id: Number(id) },
    data: rest,
  });

  return successResult(result);
};
