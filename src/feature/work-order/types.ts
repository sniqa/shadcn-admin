import { Prisma } from "@prisma/client";
import { z } from "zod";
import { workOrderTemplateShcema } from "./shecma";

export type WrokOrderTemplateShecma = z.infer<typeof workOrderTemplateShcema>;

export type WrokOrderTemplateModel = Prisma.WorkOrderTemplateGetPayload<{
  include: { workOrder: true };
}>;
