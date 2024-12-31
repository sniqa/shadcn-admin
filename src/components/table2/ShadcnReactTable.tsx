import { cn } from "@/lib/utils";
import { RowData, ShadcnReactTableInstance } from "./types";
import ShadcnReactTableToolbar from "./toolbar/ShadcnReactTableToolbar";
import ShadcnReactTableHeader from "./header/ShadcnReactTableHeader";
import ShadcnReactTableBody from "./body/ShadcnReactTableBody";
import ShadcnReactTableFooter from "./footer/ShadcnReactTableFooter";

export type ShadcnReactTableProps<TData extends RowData> = {
  table: ShadcnReactTableInstance<TData>;
  className?: string;
};

const ShadcnReactTable = <TData extends RowData>({
  table,
  className,
}: ShadcnReactTableProps<TData>) => {
  const { toolbar, header, body, footer, getState } = table;
  const { fullScreen } = getState();

  return (
    <div
      className={cn(
        " rounded-lg h-full w-full overflow-hidden bg-white flex flex-col",
        fullScreen && "fixed inset-0 z-50",
        className
      )}
    >
      {toolbar ? toolbar(table) : <ShadcnReactTableToolbar table={table} />}

      <div
        className="w-full overflow-auto flex"
        style={{ maxHeight: "calc(100% - 6rem)" }}
      >
        <table className="w-full">
          {header ? header(table) : <ShadcnReactTableHeader table={table} />}

          {body ? body(table) : <ShadcnReactTableBody table={table} />}
        </table>
      </div>

      {footer ? footer(table) : <ShadcnReactTableFooter table={table} />}
    </div>
  );
};

export default ShadcnReactTable;
