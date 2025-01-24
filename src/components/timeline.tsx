import { cn } from "@/lib/utils";
import { ReactNode } from "react";

export type TimelineItemProps = {
  title: string;
  content?: ReactNode;
  className?: string;
};

const TimelineItem = ({ title, content, className }: TimelineItemProps) => {
  return (
    <div className={cn("w-full flex text-gray-600 box-border ", className)}>
      <div className="w-24 min-w-24 flex justify-between">
        <div className="px-3 py-2  w-full flex items-center">
          <span className="text-right w-full">{title}</span>
        </div>

        <div className="relative flex justify-center items-center border border-current">
          <div className="rounded-full size-3 bg-current absolute" />
        </div>
      </div>

      <span className="w-timeline px-3 py-2 break-words ">{content}</span>
    </div>
  );
};

export default TimelineItem;
