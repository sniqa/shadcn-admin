import { WorkOrderRole } from "@prisma/client";
import { z } from "zod";

export const workOrderTemplateShecma = z.object({
  title: z.string().nonempty({ message: "Required" }),
  WorkOrderTemplateNode: z.array(
    z.object({
      users: z.array(z.string()),
      workOrderRole: z.enum([
        WorkOrderRole.PROPOSER,
        WorkOrderRole.COPY,
        WorkOrderRole.VETTING,
      ]),
      deep: z.number(),
    })
  ),
  // description: z.string(),
  // users: z.any(),
  // deep: z.number(),
});
