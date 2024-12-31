import * as React from "react";
import { Check, Settings2 } from "lucide-react";

import { cn, toSentenceCase } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ShadcnReactTableInstance } from "../types";

interface ShadcnReactTableViewOptionsProps<TData> {
  table: ShadcnReactTableInstance<TData>;
}

const ShadcnReactTableViewOptions = <TData,>({
  table,
}: ShadcnReactTableViewOptionsProps<TData>) => {
  const triggerRef = React.useRef<HTMLButtonElement>(null);

  return (
    <Popover modal>
      <PopoverTrigger asChild>
        <div className="">
          <Button
            ref={triggerRef}
            aria-label="Toggle columns"
            variant="outline"
            role="combobox"
            size="icon"
            className="size-8"
          >
            <Settings2 />
          </Button>
        </div>
      </PopoverTrigger>
      <PopoverContent
        align="end"
        className="w-44 p-0"
        onCloseAutoFocus={() => triggerRef.current?.focus()}
      >
        <Command>
          <CommandInput placeholder="Search columns..." />
          <CommandList>
            <CommandEmpty>No columns found.</CommandEmpty>
            <CommandGroup>
              {table
                .getAllColumns()
                .filter(
                  (column) =>
                    typeof column.accessorFn !== "undefined" &&
                    column.getCanHide()
                )
                .map((column) => {
                  return (
                    <CommandItem
                      key={column.id}
                      onSelect={() =>
                        column.toggleVisibility(!column.getIsVisible())
                      }
                    >
                      <span className="truncate">
                        {toSentenceCase(column.id)}
                      </span>
                      <Check
                        className={cn(
                          "ml-auto size-4 shrink-0",
                          column.getIsVisible() ? "opacity-100" : "opacity-0"
                        )}
                      />
                    </CommandItem>
                  );
                })}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default ShadcnReactTableViewOptions;
