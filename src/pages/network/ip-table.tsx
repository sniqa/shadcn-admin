import { cn } from "@/lib/utils";
import { type NetworkTypeIpModel } from "@/types/network";
import { ColumnDef } from "@tanstack/react-table";
import {
  ShadcnReactTable,
  useShadcnReactTable,
  ShadcnReactTableToolbar,
} from "@/components/table2";
import CustomBreadcrumb from "@/components/custom-breadcrumb";

const columns: ColumnDef<NetworkTypeIpModel>[] = [
  {
    accessorKey: "ip",
    header: "IP地址",
    meta: {
      className: cn(
        "drop-shadow-[0_1px_2px_rgb(0_0_0_/_0.1)] dark:drop-shadow-[0_1px_2px_rgb(255_255_255_/_0.1)] lg:drop-shadow-none",
        "bg-background transition-colors duration-200 group-hover/row:bg-muted group-data-[state=selected]/row:bg-muted",
        "sticky left-6 md:table-cell"
      ),
    },
    enableHiding: false,
  },
  {
    id: "user",
    accessorKey: "user",
    header: "使用人",
    meta: { className: "w-36" },
  },
  {
    accessorKey: "location",
    header: "位置",
    enableResizing: true,
    enableSorting: true,
  },
  {
    accessorKey: "panelNumber",
    header: "席位端口",
    enableSorting: false,
  },
  {
    accessorKey: "updateAt",
    header: "修改时间",
  },
];

const IpTable = ({
  data,
  title = "",
}: {
  data: NetworkTypeIpModel[];
  title?: string;
}) => {
  // console.log(data);

  const table = useShadcnReactTable({
    data,
    columns,
    enableSelect: true,
    customActions: () => <>hello</>,
    toolbar: (table) => (
      <ShadcnReactTableToolbar
        customFeture={<CustomBreadcrumb data={[{ title }]} />}
        table={table}
      />
    ),
  });

  return <ShadcnReactTable table={table} />;
};

export default IpTable;
