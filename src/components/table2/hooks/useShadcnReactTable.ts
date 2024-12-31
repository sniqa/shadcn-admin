import {
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  RowData,
  useReactTable,
} from "@tanstack/react-table";
import { DensityFeature } from "../feture/density";
import { FullScreenFeature } from "../feture/fullScreen";
import { ShadcnReactTableOptions } from "../types";
import { useState } from "react";
import { useColumns } from "./useColumns";

export const useShadcnReactTable = <TData extends RowData>({
  columns,
  data,
  enableSelect,
  customActions,
  toolbar,
  header,
  body,
  footer,
}: ShadcnReactTableOptions<TData>) => {
  const [globalFilter, setGlobalFilter] = useState("");

  const newColumns = useColumns(columns, {
    enableSelect,
    customActions,
  });

  const table = useReactTable({
    columns: newColumns,
    data,
    _features: [DensityFeature, FullScreenFeature],
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    state: {
      globalFilter,
    },
    onGlobalFilterChange: setGlobalFilter,
  });

  table.toolbar = toolbar;
  table.header = header;
  table.body = body;
  table.footer = footer;

  return table;
};
