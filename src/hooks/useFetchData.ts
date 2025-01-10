/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { socket } from "@/lib/socket";
import { FaildResult, SuccessResult } from "@/types/result";
import { ClientToServerEvents } from "@/types/socket";
import { useEffect, useState } from "react";

const eventMap = new Map();

export const useSocketLoaderData = <TData extends Record<string, any>>(
  event: keyof ClientToServerEvents,
  args: Parameters<ClientToServerEvents[keyof ClientToServerEvents]>[0]
) => {
  const [data, setData] = useState<TData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [isReflush, setIsRefulsh] = useState(false);

  useEffect(() => {
    if (!eventMap.has(event)) {
      eventMap.set(event, () => setIsRefulsh((o) => !o));
    }
  }, [event]);

  useEffect(() => {
    setLoading(true);

    socket.emit(event, args as any, (result) => {
      setLoading(false);

      if (result.success) {
        setData(result.data as unknown as TData);
      } else {
        setError(result.message);
      }
    });
  }, [event, isReflush]);

  return {
    data,
    loading,
    error,
  };
};

export const useSocketAction = <TData>(events?: string[]) => {
  const [loading, setLoading] = useState(false);

  const action = (
    event: keyof ClientToServerEvents,
    args: Parameters<ClientToServerEvents[keyof ClientToServerEvents]>[0]
  ): Promise<FaildResult | SuccessResult<TData>> =>
    new Promise((resolve) => {
      setLoading(true);

      socket.emit(event, args as any, (result) => {
        setLoading(false);

        events &&
          events.forEach((event) => {
            const fn = eventMap.get(event);
            console.log(fn);

            fn();
          });

        resolve(result as FaildResult | SuccessResult<TData>);
      });
    });

  return [action, loading] as const;
};
