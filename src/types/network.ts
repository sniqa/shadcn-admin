/* eslint-disable @typescript-eslint/no-unused-vars */
import { z } from "zod";
import { Prisma } from "@prisma/client";

const IpModel: Prisma.IpAddressSelect = {
  network: true,
};

// NETWORK

export const networkSchema = z.object({
  parentId: z.number().or(z.null()),
  name: z.string(),
  startIp: z.string(),
  endIp: z.string(),
  netmask: z.string(),
  gateway: z.string(),
  vlan: z.string(),
  remark: z.string(),
  createAt: z.date(),
  updateAt: z.date(),
});

// IP
export const ipSchema = z.object({
  ip: z.string(),
  panelNumber: z.string(),
  user: z.string(),
  location: z.string(),
  remark: z.string(),
  createAt: z.date(),
  updateAt: z.date(),
});

export type NetworkTypeSchema = z.infer<typeof networkSchema>;
export type NetworkTypeModel = Prisma.NetworkGetPayload<{
  include: {
    children: true;
    ips: true;
  };
}>;
export type NetworkTypeIpSchema = z.infer<typeof ipSchema>;
export type NetworkTypeIpModel = Prisma.IpAddressGetPayload<object>;
