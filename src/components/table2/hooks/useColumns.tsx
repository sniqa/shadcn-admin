import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";
import { CellContext, ColumnDef, RowData } from "@tanstack/react-table";
import { ReactNode, useMemo } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Ellipsis } from "lucide-react";
import { Button } from "@/components/ui/button";

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
  items: (cell: CellContext<TData, unknown>) => ReactNode
): ColumnDef<TData> => ({
  id: "actions",

  cell: function Cell(cell) {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            aria-label="Open menu"
            variant="ghost"
            className="flex size-8 p-0 data-[state=open]:bg-muted"
          >
            <Ellipsis className="size-4" aria-hidden="true" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-40">
          {items(cell)}
        </DropdownMenuContent>
      </DropdownMenu>
    );
  },
  size: 10,
  maxSize: 10,
  enableHiding: false,
  enableSorting: false,
});

export const useColumns = <TData extends RowData>(
  columns: ColumnDef<TData>[],
  options: {
    enableSelect?: boolean;
    customActions?: (cell: CellContext<TData, unknown>) => ReactNode;
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
