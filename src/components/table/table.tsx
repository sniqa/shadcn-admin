import { RowData } from "@tanstack/react-table";
import {
  DataTable,
  type DataTableProps,
} from "./components/data-table/data-table";
import { DataTableToolbar } from "./components/data-table/data-table-toolbar";
import { cn } from "@/lib/utils";

type TableProps<TData extends RowData> = DataTableProps<TData> & {
  className?: string;
};

const Table = <TData extends RowData>({
  table,
  className,
}: TableProps<TData>) => {
  console.log("table");

  return (
    <div
      className={cn(
        "w-full h-full bg-white dark:bg-slate-900 overflow-hidden flex flex-col rounded-md",
        className
      )}
    >
      <DataTableToolbar
        table={table}
        className="w-full h-14 min-h-14 px-2 border-b"
      />
      <DataTable table={table} className="border-0" />
    </div>
  );
};

export default Table;
