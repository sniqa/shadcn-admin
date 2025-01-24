/* eslint-disable @typescript-eslint/no-unused-vars */
import { prisma } from "@/server/db";
import { successResult, faildResult } from "@/server/result";
import { type NetworkTypeModel, NetworkTypeSchema } from "../types";
import { networkSchema } from "../shecma";
import ip from "ip";
import { SearchCondition } from "@/types";

//create
export const create_network = async (data: NetworkTypeSchema) => {
  const { success, error } = networkSchema.safeParse(data);

  if (!success) {
    return faildResult(`args error: ${error}`);
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

  const netowrk = await prisma.network.create({
    data: { ...data, ips: { create: ips || null } },
  });

  return successResult(netowrk);
};

// find
export const find_network = async (data: SearchCondition | null) => {
  const result = await prisma.network.findMany({
    where: data?.where,
    include: data?.include,
  });

  return successResult(result);
};

// network tree node
export const find_network_tree = async () => {
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
  const result = await prisma.network.delete({ where: { id: Number(id) } });

  return successResult(result);
};

// update
export const update_network = async (data: NetworkTypeModel) => {
  const { id, children, ips, ...rest } = data;

  const result = await prisma.network.update({
    where: { id: Number(id) },
    data: rest,
  });

  return successResult(result);
};
