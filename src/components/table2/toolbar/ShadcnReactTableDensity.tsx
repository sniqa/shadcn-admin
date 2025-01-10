import { CustomTooltip } from "@/components/custom-tooltip";
import { RowData, ShadcnReactTableInstance } from "../types";

import { Button } from "@/components/ui/button";
import { Rows2, Rows3, Rows4 } from "lucide-react";
import { CONSTANT } from "../lib/constant";

export type ShadcnReactTableDensityProps<TData extends RowData> = {
  table: ShadcnReactTableInstance<TData>;
  className?: string;
};

const ShadcnReactTableDensity = <TData extends RowData>({
  table: { toggleDensity, getState },
}: ShadcnReactTableDensityProps<TData>) => {
  const { density } = getState();

  return (
    <CustomTooltip label={CONSTANT.TOGGLE_DENSITY}>
      <div>
        <Button
          variant={"outline"}
          size={"icon"}
          onClick={toggleDensity}
          className="size-8"
        >
          {density === "sm" ? (
            <Rows4 />
          ) : density === "md" ? (
            <Rows3 />
          ) : (
            <Rows2 />
          )}
        </Button>
      </div>
    </CustomTooltip>
  );
};

export default ShadcnReactTableDensity;
