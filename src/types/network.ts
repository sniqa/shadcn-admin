import { z } from "zod";

// NETWORK
export type WithId = {
  id?: number | null;
};

export const networkSchema = z.object({
  parentId: z.number().or(z.null()),
  name: z.string(),
  startIp: z.string(),
  endIp: z.string(),
  netmask: z.string(),
  gateway: z.string(),
  vlan: z.string(),
  remark: z.string(),
});

export type NetworkType = z.infer<typeof networkSchema>;

export type NetworkTypeWithId = NetworkType & WithId;

// IP
export const ipSchema = z.object({
  ip: z.string(),
  panelNumber: z.string(),
  user: z.string(),
  location: z.string(),
  remark: z.string(),
  updateAt: z.date(),
});

export type IpType = z.infer<typeof ipSchema>;

export type IpTypeWithId = IpType & WithId;
