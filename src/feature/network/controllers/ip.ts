import { NetworkTypeIpModel } from "../types";
import { prisma } from "@/server/db";
import { successResult } from "@/server/result";

// update
export const update_ip = async (data: NetworkTypeIpModel) => {
  const { id, ...rest } = data;

  const result = await prisma.ipAddress.update({
    where: { id: Number(id) },
    data: rest,
  });

  return successResult(result);
};

// delete
export const delete_ip = async (data: NetworkTypeIpModel) => {
  console.log(data.id);

  const result = await prisma.ipAddress.delete({
    where: { id: Number(data.id) },
  });

  return successResult(result);
};
