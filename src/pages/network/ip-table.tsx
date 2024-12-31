import DataTable from "@/components/table/table";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";
import { IpTypeWithId } from "@/types/network";
import {
  ColumnDef,
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  RowData,
  useReactTable,
} from "@tanstack/react-table";
import { ShadcnReactTable, useShadcnReactTable } from "@/components/table2";

const columns: ColumnDef<IpTypeWithId>[] = [
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

const IpTable = <TData extends RowData>({ data }: { data: TData[] }) => {
  console.log(data);

  // const table = useReactTable({
  //   columns,
  //   data,
  //   getCoreRowModel: getCoreRowModel(),
  //   getFilteredRowModel: getFilteredRowModel(),
  //   getPaginationRowModel: getPaginationRowModel(),
  //   getSortedRowModel: getSortedRowModel(),
  //   getFacetedRowModel: getFacetedRowModel(),
  //   getFacetedUniqueValues: getFacetedUniqueValues(),
  // });

  const table = useShadcnReactTable({
    columns,
    data,
    enableSelect: true,
    customActions: () => <>hello</>,
  });

  // return <DataTable table={table} />;

  return <ShadcnReactTable table={table} />;
};

export default IpTable;
