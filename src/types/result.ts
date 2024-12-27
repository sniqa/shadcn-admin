// export type TData = string | number | object | null | undefined;

export type SuccessResult<TData> = {
  success: true;
  data: TData;
};

export type FaildResult = {
  success: false;
  message: string;
  code?: number;
};
