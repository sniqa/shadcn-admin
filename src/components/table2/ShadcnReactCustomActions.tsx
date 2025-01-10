import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Ellipsis } from "lucide-react";
import { ReactNode } from "react";
import { CellContext, RowData } from "@tanstack/react-table";

export type ShadcnReactTableCustomAction<TData extends RowData> = {
  title: ReactNode;
  icon?: ReactNode;
  onClick?: (cell: CellContext<TData, unknown>) => void;
  className?: string;
};

export type ShadcnReactTableCustomActionsProps<TData extends RowData> = {
  actions: ShadcnReactTableCustomAction<TData>[];
  cell: CellContext<TData, unknown>;
};

const ShadcnReactCustomActions = <TData extends RowData>({
  actions,
  cell,
}: ShadcnReactTableCustomActionsProps<TData>) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          aria-label="Open menu"
          variant="ghost"
          className="flex size-8 p-0 data-[state=open]:bg-muted"
        >
          <Ellipsis className="size-4" aria-hidden="true" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-40">
        {actions.map((action, index) => (
          <DropdownMenuItem
            key={index}
            onClick={() => action.onClick && action.onClick(cell)}
            className={action.className}
          >
            {action.title}
            {action.icon && (
              <DropdownMenuShortcut>{action.icon}</DropdownMenuShortcut>
            )}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ShadcnReactCustomActions;
