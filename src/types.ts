export type SearchCondition = {
  where?: Record<string, unknown>;
  include?: Record<string, unknown>;
  exclude?: Record<string, unknown>;
  select?: Record<string, unknown>;
};

export type SuccessResult<TData> = {
  success: true;
  data: TData;
};

export type FaildResult = {
  success: false;
  message: string;
  code?: number;
};
