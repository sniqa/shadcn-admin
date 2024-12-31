import { RowData, ShadcnReactTableInstance } from "../types";

import { Button } from "@/components/ui/button";
import { Rows2, Rows3, Rows4 } from "lucide-react";

export type ShadcnReactTableDensityProps<TData extends RowData> = {
  table: ShadcnReactTableInstance<TData>;
  className?: string;
};

const ShadcnReactTableDensity = <TData extends RowData>({
  table: { toggleDensity, getState },
}: ShadcnReactTableDensityProps<TData>) => {
  const { density } = getState();

  return (
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
  );
};

export default ShadcnReactTableDensity;
