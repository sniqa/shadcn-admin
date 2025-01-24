/* eslint-disable @typescript-eslint/no-unused-vars */
import { z } from "zod";
import { Prisma } from "@prisma/client";
import { networkSchema, ipSchema } from "./shecma";

const IpModel: Prisma.IpAddressSelect = {
  network: true,
};

export type NetworkTypeSchema = z.infer<typeof networkSchema>;
export type NetworkTypeModel = Prisma.NetworkGetPayload<{
  include: {
    children: true;
    ips: true;
  };
}>;
export type NetworkTypeIpSchema = z.infer<typeof ipSchema>;
export type NetworkTypeIpModel = Prisma.IpAddressGetPayload<object>;
