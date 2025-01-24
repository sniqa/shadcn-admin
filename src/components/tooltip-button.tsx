import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { ReactNode } from "react";
import { Button, type ButtonProps } from "./ui/button";

export type TooltipButtonProps = {
  label: ReactNode;
  children: ReactNode;
} & ButtonProps;

const TooltipButton = ({ label, children, ...props }: TooltipButtonProps) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button {...props}>{children}</Button>
        </TooltipTrigger>
        <TooltipContent>{label}</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default TooltipButton;
