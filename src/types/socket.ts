/* eslint-disable @typescript-eslint/no-explicit-any */
import { NetworkType, NetworkTypeWithId } from "@/types/network";
import { FaildResult, SuccessResult } from "./result";

export type SocketDataType = Record<string, any>;

export type ServerToClientEvents = {
  noArg: () => void;
  basicEmit: (a: number, b: string, c: Buffer) => void;
  withAck: (d: string, callback: (e: number) => void) => void;
};

export type ClientToServerEvents = {
  create_network: (
    data: NetworkType,
    callback: <TData>(result: SuccessResult<TData> | FaildResult) => void
  ) => void;
  find_network: (
    data: Record<string, any> | null,
    callback: <TData>(result: SuccessResult<TData> | FaildResult) => void
  ) => void;
  delete_network: (
    id: { id: string },
    callback: <TData>(result: SuccessResult<TData> | FaildResult) => void
  ) => void;
  update_network: (
    data: NetworkTypeWithId,
    callback: <TData>(result: SuccessResult<TData> | FaildResult) => void
  )
};

export type InterServerEvents = {
  ping: () => void;
};

export type SocketData = {
  name: string;
  age: number;
};
