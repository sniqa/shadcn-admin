/* eslint-disable @typescript-eslint/no-empty-object-type */
import {
  CellContext,
  ColumnDef,
  RowData,
  Table as ShadcnReactTableInstance,
} from "@tanstack/react-table";
import {
  DensityInstance,
  DensityOptions,
  DensityTableState,
} from "./feture/density";
import {
  FullScreenInstance,
  FullScrenOptions,
  FullScrenState,
} from "./feture/fullScreen";

export type { RowData, ColumnDef, ShadcnReactTableInstance };

export type ShadcnReactTableState = DensityTableState & FullScrenState & {};

export type ShadcnReactTableOptions<TData extends RowData> = {
  columns: ColumnDef<TData>[];
  data: TData[];
  enableSelect?: boolean;
  customActions?: (cell: CellContext<TData, unknown>) => React.ReactNode;
  toolbar?: (table: ShadcnReactTableInstance<TData>) => React.ReactNode;
  header?: (table: ShadcnReactTableInstance<TData>) => React.ReactNode;
  body?: (table: ShadcnReactTableInstance<TData>) => React.ReactNode;
  footer?: (table: ShadcnReactTableInstance<TData>) => React.ReactNode;
} & DensityOptions &
  FullScrenOptions;

export type TableInstance<TData extends RowData> = {
  toolbar?: (table: ShadcnReactTableInstance<TData>) => React.ReactNode;
  header?: (table: ShadcnReactTableInstance<TData>) => React.ReactNode;
  body?: (table: ShadcnReactTableInstance<TData>) => React.ReactNode;
  footer?: (table: ShadcnReactTableInstance<TData>) => React.ReactNode;
} & DensityInstance &
  FullScreenInstance;

declare module "@tanstack/react-table" {
  interface TableState extends ShadcnReactTableState {}
  interface TableOptionsResolved<TData extends RowData>
    extends ShadcnReactTableOptions<TData> {}
  interface Table<TData extends RowData> extends TableInstance<TData> {}
}
