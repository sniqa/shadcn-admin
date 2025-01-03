export type SearchCondition = {
  where?: Record<string, unknown>;
  include?: Record<string, unknown>;
  exclude?: Record<string, unknown>;
  select?: Record<string, unknown>;
};
