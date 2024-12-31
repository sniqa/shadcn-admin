import { RowData, ShadcnReactTableInstance } from "../types";

import { Button } from "@/components/ui/button";
import { Minimize, Maximize } from "lucide-react";

export type ShadcnReactTableFullScreenProps<TData extends RowData> = {
  table: ShadcnReactTableInstance<TData>;
};

const ShadcnReactTableFullScreen = <TData extends RowData>({
  table: { getState, toggleFullScreen },
}: ShadcnReactTableFullScreenProps<TData>) => {
  const { fullScreen } = getState();

  return (
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
  );
};

export default ShadcnReactTableFullScreen;
