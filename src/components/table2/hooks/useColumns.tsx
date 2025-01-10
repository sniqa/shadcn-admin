import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";
import { ColumnDef, RowData } from "@tanstack/react-table";
import { useMemo } from "react";

import ShadcnReactCustomActions, {
  type ShadcnReactTableCustomAction,
} from "../ShadcnReactCustomActions";

const select = <TData extends RowData>(): ColumnDef<TData> => ({
  id: "select",
  header: ({ table }) => (
    <Checkbox
      checked={
        table.getIsAllPageRowsSelected() ||
        (table.getIsSomePageRowsSelected() && "indeterminate")
      }
      onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
      aria-label="Select all"
      className="translate-y-[2px]"
    />
  ),
  size: 30,
  meta: {
    className: cn(
      "sticky md:table-cell left-0 z-10 rounded-tl",
      "bg-background transition-colors duration-200 group-hover/row:bg-muted group-data-[state=selected]/row:bg-muted"
    ),
  },
  cell: ({ row }) => (
    <Checkbox
      checked={row.getIsSelected()}
      onCheckedChange={(value) => row.toggleSelected(!!value)}
      aria-label="Select row"
      className="translate-y-[2px]"
    />
  ),
  enableSorting: false,
  enableHiding: false,
});

const actions = <TData extends RowData>(
  actions: ShadcnReactTableCustomAction<TData>[]
): ColumnDef<TData> => ({
  id: "actions",
  cell: (cell) => <ShadcnReactCustomActions actions={actions} cell={cell} />,
  size: 10,
  maxSize: 10,
  enableHiding: false,
  enableSorting: false,
});

export const useColumns = <TData extends RowData>(
  columns: ColumnDef<TData>[],
  options: {
    enableSelect?: boolean;
    customActions?: ShadcnReactTableCustomAction<TData>[];
  }
) => {
  const { enableSelect, customActions } = options;

  return useMemo(() => {
    let newColumns = columns;
    if (enableSelect && columns.every((column) => column.id !== "select")) {
      newColumns = [select(), ...columns];
    }
    if (customActions && columns.every((column) => column.id !== "actions")) {
      newColumns = [...columns, actions(customActions)];
    }

    return newColumns;
  }, [columns, enableSelect, customActions]);
};
