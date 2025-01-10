import { CustomTooltip } from "@/components/custom-tooltip";
import { RowData, ShadcnReactTableInstance } from "../types";

import { Button } from "@/components/ui/button";
import { Minimize, Maximize } from "lucide-react";
import { CONSTANT } from "../lib/constant";

export type ShadcnReactTableFullScreenProps<TData extends RowData> = {
  table: ShadcnReactTableInstance<TData>;
};

const ShadcnReactTableFullScreen = <TData extends RowData>({
  table: { getState, toggleFullScreen },
}: ShadcnReactTableFullScreenProps<TData>) => {
  const { fullScreen } = getState();

  return (
    <CustomTooltip label={CONSTANT.TOGGLE_FULLSCREEN}>
      <div>
        <Button
          variant={"outline"}
          size={"icon"}
          className="size-8"
          onClick={toggleFullScreen}
        >
          {fullScreen ? <Minimize /> : <Maximize />}
        </Button>
      </div>
    </CustomTooltip>
  );
};

export default ShadcnReactTableFullScreen;
