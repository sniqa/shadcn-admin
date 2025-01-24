import type { SuccessResult, FaildResult } from "@/types";

export const successResult = <TData>(data: TData): SuccessResult<TData> => ({
  success: true,
  data,
});

export const faildResult = (message: string, code?: number): FaildResult => {
  return code ? { success: false, message, code } : { success: false, message };
};
