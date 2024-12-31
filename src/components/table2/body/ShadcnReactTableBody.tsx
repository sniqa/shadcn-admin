import { cn } from "@/lib/utils";
import { RowData, ShadcnReactTableInstance } from "../types";
import { TableBody, TableRow, TableCell } from "@/components/ui/table";
import { flexRender } from "@tanstack/react-table";
import { getCommonPinningStyles } from "../lib/utils";

export type ShadcnReactTableBody<TData extends RowData> = {
  table: ShadcnReactTableInstance<TData>;
  className?: string;
};

const ShadcnReactTableBody = <TData extends RowData>({
  table,
  className,
}: ShadcnReactTableBody<TData>) => {
  const { density } = table.getState();

  return (
    <TableBody className={cn("", className)}>
      {table.getRowModel().rows?.length ? (
        table.getRowModel().rows.map((row) => (
          <TableRow key={row.id} data-state={row.getIsSelected() && "selected"}>
            {row.getVisibleCells().map((cell) => (
              <TableCell
                key={cell.id}
                className={cn(
                  density === "sm" ? "p-1" : density === "md" ? "p-2" : "p-3",
                  "transition-all"
                )}
                style={{
                  ...getCommonPinningStyles({ column: cell.column }),
                }}
              >
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </TableCell>
            ))}
          </TableRow>
        ))
      ) : (
        <TableRow>
          <TableCell
            colSpan={table.getAllColumns().length}
            className="h-24 text-center"
          >
            No results.
          </TableCell>
        </TableRow>
      )}
    </TableBody>
  );
};

export default ShadcnReactTableBody;
