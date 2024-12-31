import { cn } from "@/lib/utils";
import { RowData, ShadcnReactTableInstance } from "../types";
import { DataTablePagination } from "./pagination";

export type ShadcnReactTableFooter<TData extends RowData> = {
  table: ShadcnReactTableInstance<TData>;
  className?: string;
};

const ShadcnReactTableFooter = <TData extends RowData>({
  table,
  className,
}: ShadcnReactTableFooter<TData>) => {
  return (
    <div className={cn("h-12 min-h-12 px-2 items-center", className)}>
      <DataTablePagination table={table} />
    </div>
  );
};

export default ShadcnReactTableFooter;
