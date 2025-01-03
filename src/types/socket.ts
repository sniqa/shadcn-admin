/* eslint-disable @typescript-eslint/no-explicit-any */
import type { NetworkType } from "@/types/network";
import { FaildResult, SuccessResult } from "./result";
import { SearchCondition } from "./common";

export type SocketDataType = Record<string, any>;

export type ServerToClientEvents = {
  noArg: () => void;
  basicEmit: (a: number, b: string, c: Buffer) => void;
  withAck: (d: string, callback: (e: number) => void) => void;
};

export type ClientToServerEvents = {
  create_network: (
    data: NetworkType["Schema"],
    callback: <TData>(result: SuccessResult<TData> | FaildResult) => void
  ) => void;
  find_network: (
    data: SearchCondition | null,
    callback: <TData>(result: SuccessResult<TData> | FaildResult) => void
  ) => void;

  delete_network: (
    id: { id: number },
    callback: <TData>(result: SuccessResult<TData> | FaildResult) => void
  ) => void;
  update_network: (
    data: NetworkType["Model"],
    callback: <TData>(result: SuccessResult<TData> | FaildResult) => void
  ) => void;
};

export type InterServerEvents = {
  ping: () => void;
};

export type SocketData = {
  name: string;
  age: number;
};
