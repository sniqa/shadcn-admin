/* eslint-disable @typescript-eslint/no-explicit-any */
import type {
  NetworkTypeIpModel,
  NetworkTypeModel,
  NetworkTypeSchema,
} from "@/feature/network/types";
import { FaildResult, SuccessResult, SearchCondition } from "@/types";
import { UserModel } from "@/feature/user/types";

export type SocketDataType = Record<string, any>;

export type ServerToClientEvents = {
  needLogin: () => void;
};

export type ClientToServerEvents = {
  create_network: (
    data: NetworkTypeSchema,
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
    data: NetworkTypeModel,
    callback: <TData>(result: SuccessResult<TData> | FaildResult) => void
  ) => void;
  update_ip: (
    data: NetworkTypeIpModel,
    callback: <TData>(result: SuccessResult<TData> | FaildResult) => void
  ) => void;
  delete_ip: (
    data: NetworkTypeIpModel,
    callback: <TData>(result: SuccessResult<TData> | FaildResult) => void
  ) => void;
  login: (
    data: { username: string; password: string },
    callback: <TData>(result: SuccessResult<TData> | FaildResult) => void
  ) => void;
  find_users: (
    data: SearchCondition | null,
    callback: <TData>(result: SuccessResult<TData> | FaildResult) => void
  ) => void;
  create_user: (
    data: UserModel,
    callback: <TData>(result: SuccessResult<TData> | FaildResult) => void
  ) => void;
  update_user: (
    data: UserModel,
    callback: <TData>(result: SuccessResult<TData> | FaildResult) => void
  ) => void;
  delete_user: (
    data: UserModel,
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
