/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { ClientToServerEvents } from "@/types/socket";
import { socket } from "@/lib/socket";

export const useSocketLoaderData = <TData extends Record<string, any>>(
  event: keyof ClientToServerEvents,
  args: Parameters<ClientToServerEvents[keyof ClientToServerEvents]>[0]
) => {
  const [data, setData] = useState<TData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [isReflush, setIsRefulsh] = useState(false);

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

  const refulsh = () => setIsRefulsh((o) => !o);

  return {
    data,
    loading,
    error,
    refulsh,
  };
};
