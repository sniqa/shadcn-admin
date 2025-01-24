import {
  NetworkTypeIpModel,
  NetworkTypeModel,
  NetworkTypeSchema,
} from "./types";
import { SuccessResult, FaildResult } from "../../types/result";

export type NetworkToServerEvents = {
  create_network: (
    data: NetworkTypeSchema,
    callback: <TData>(result: SuccessResult<TData> | FaildResult) => void
  ) => void;
  find_network: (
    data: object | null,
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
};
