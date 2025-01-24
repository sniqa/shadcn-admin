import { z } from "zod";
// NETWORK
export const networkSchema = z.object({
  parentId: z.number().or(z.null()),
  name: z.string().nonempty({ message: "Required" }),
  startIp: z.literal("").or(z.string().ip({ message: "Invalid IP address" })),
  endIp: z.literal("").or(z.string().ip({ message: "Invalid IP address" })),
  netmask: z.string(),
  gateway: z.string(),
  vlan: z.string(),
  remark: z.string(),
});

// IP
export const ipSchema = z.object({
  ip: z
    .string()
    .nonempty({ message: "Required" })
    .ip({ message: "Invalid IP address" }),
  panelNumber: z.string(),
  user: z.string(),
  location: z.string(),
  remark: z.string(),
});
