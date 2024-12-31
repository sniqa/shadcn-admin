import { cn } from "@/lib/utils";
import { RowData, ShadcnReactTableInstance } from "../types";
import { CONSTANT } from "@/lib/constant";
import DebouncedInput from "@/components/debounced-input";
import ShadcnReactTableViewOptions from "./ShadcnReactTableViewOptions";
import ShadcnReactTableDensity from "./ShadcnReactTableDensity";
import ShadcnReactTableFullScreen from "./ShadcnReactTableFullScreen";

export type ShadcnReactTableToolbarProps<TData extends RowData> = {
  table: ShadcnReactTableInstance<TData>;
  className?: string;
};

const ShadcnReactTableToolbar = <TData extends RowData>({
  table,
  className,
}: ShadcnReactTableToolbarProps<TData>) => {
  const { globalFilter } = table.getState();
  const { setGlobalFilter } = table;

  return (
    <div
      className={cn(
        "border-b h-14 min-h-14 flex items-center justify-between px-2",
        className
      )}
    >
      <div className=""></div>

      <div className="flex items-center gap-2">
        <DebouncedInput
          value={globalFilter}
          placeholder={CONSTANT.SEARCH}
          onChange={(v) => setGlobalFilter(String(v))}
          className="h-8"
        />

        <ShadcnReactTableDensity table={table} />

        <ShadcnReactTableViewOptions table={table} />

        <ShadcnReactTableFullScreen table={table} />
      </div>
    </div>
  );
};

export default ShadcnReactTableToolbar;
