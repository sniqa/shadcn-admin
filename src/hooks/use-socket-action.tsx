/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { ClientToServerEvents } from "@/types/socket";
import { socket } from "@/lib/socket";
import { useState } from "react";
import { FaildResult, SuccessResult } from "@/types/result";

export const useSocketAction = <TData,>(reflush?: () => void) => {
  const [loading, setLoading] = useState(false);

  const action = (
    event: keyof ClientToServerEvents,
    args: Parameters<ClientToServerEvents[keyof ClientToServerEvents]>[0]
  ): Promise<FaildResult | SuccessResult<TData>> =>
    new Promise((resolve) => {
      setLoading(true);

      socket.emit(event, args, (result) => {
        setLoading(false);

        reflush && reflush();

        resolve(result as FaildResult | SuccessResult<TData>);
      });
    });

  return [action, loading] as const;
};
