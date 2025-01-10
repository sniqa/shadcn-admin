import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { cn } from "@/lib/utils";

type BreadcrumbData = {
  title: string;
  to?: string;
};

export type CustomBreadcrumbProps = {
  data: BreadcrumbData[];
  className?: string;
};

const CustomBreadcrumb = ({ data, className }: CustomBreadcrumbProps) => {
  const last = data.length - 1;

  return (
    <Breadcrumb className={cn("text-sm", className)}>
      <BreadcrumbList>
        {data.map((d, index) => (
          // <>
          <BreadcrumbItem key={d.title}>
            {d.to ? (
              <BreadcrumbLink href={d.to}>{d.title}</BreadcrumbLink>
            ) : (
              <BreadcrumbPage>{d.title}</BreadcrumbPage>
            )}
            {index != last && <BreadcrumbSeparator key={index} />}
          </BreadcrumbItem>

          // {/* </> */}
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
};

export default CustomBreadcrumb;
