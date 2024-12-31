import { cn } from "@/lib/utils";
import { RowData, ShadcnReactTableInstance } from "../types";
import { TableHeader, TableHead, TableRow } from "@/components/ui/table";
import { getCommonPinningStyles } from "../lib/utils";
import { flexRender } from "@tanstack/react-table";
import { ShadcnReactTableSortButton } from "./ShadcnReactTableSortButton";

export type ShadcnReactTableHeader<TData extends RowData> = {
  table: ShadcnReactTableInstance<TData>;
  className?: string;
};

const ShadcnReactTableHeader = <TData extends RowData>({
  table,
  className,
}: ShadcnReactTableHeader<TData>) => {
  const { density } = table.getState();

  return (
    <TableHeader className={cn("h-12 min-h-12 w-full", className)}>
      {table.getHeaderGroups().map((headerGroup) => (
        <TableRow key={headerGroup.id}>
          {headerGroup.headers.map((header) => {
            return (
              <TableHead
                key={header.id}
                colSpan={header.colSpan}
                className={cn(
                  density === "sm" ? "p-1" : density === "md" ? "p-2" : "p-3",
                  "transition-all"
                )}
                style={{
                  ...getCommonPinningStyles({ column: header.column }),
                }}
              >
                <div className="flex items-center">
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                  <ShadcnReactTableSortButton column={header.column} />
                </div>
              </TableHead>
            );
          })}
        </TableRow>
      ))}
    </TableHeader>
  );
};

export default ShadcnReactTableHeader;
