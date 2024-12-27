import { prisma } from "@/server/db";
import { successResult, faildResult } from "@/server/result";
import {
  networkSchema,
  NetworkTypeWithId,
  type NetworkType,
} from "@/types/network";
import ip from "ip";

//create
export const create_network = async (data: NetworkType) => {
  const { success } = networkSchema.safeParse(data);

  if (!success) {
    return faildResult("args error");
  }

  if (await prisma.network.findFirst({ where: { name: data.name } })) {
    return faildResult("repeat");
  }

  let ips: { ip: string }[] = [];
  if (data.startIp !== "") {
    if (data.endIp !== "") {
      const startLong = ip.toLong(data.startIp);
      const length = ip.toLong(data.endIp) - startLong + 1;

      ips = Array.from({ length }, (_, index) => ({
        ip: ip.fromLong(startLong + index),
      }));
    } else {
      ips = Array.from({ length: 1 }, () => ({
        ip: data.startIp,
      }));
    }
  }

  console.log(ips);

  const netowrk = await prisma.network.create({
    data: { ...data, ips: { create: ips || null } },
  });

  return successResult(netowrk);
};

export const find_network = async () => {
  console.log("find_network");

  const result = await prisma.network.findMany({
    where: { parentId: null },
    include: {
      children: {
        include: { children: true },
      },
      ips: true,
    },
  });

  return successResult(result);
};

// delete
export const delete_network = async ({ id }: { id: string }) => {
  console.log(id);

  const result = await prisma.network.delete({ where: { id: Number(id) } });

  return successResult(result);
};

// update
export const update_network = async (data: NetworkTypeWithId) => {
  const { id, ...rest } = data;

  const result = await prisma.network.update({
    where: { id: Number(id) },
    data: rest,
  });

  return successResult(result);
};
