import { cn } from "@/lib/utils";
import { type NetworkTypeIpModel } from "../types";
import { ColumnDef } from "@tanstack/react-table";
import {
  ShadcnReactTable,
  useShadcnReactTable,
  ShadcnReactTableToolbar,
} from "@/components/table2";
import CustomBreadcrumb from "@/components/custom-breadcrumb";

import { Delete, Edit } from "lucide-react";
import { useSocketAction } from "@/hooks/useFetchData";
import { useToast } from "@/hooks/use-toast";
import { CONSTANT } from "@/lib/constant";
import { useToggleState } from "@/lib/hooks";
import ComfirmDialog from "@/components/comfirm-dialog";
import { memo, useState } from "react";
import IpDialog from "./ip-dialog";

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
    accessorKey: "remark",
    header: "备注",
    enableSorting: false,
  },
  {
    accessorKey: "updateAt",
    header: "修改时间",
    cell: ({ cell }) => new Date(cell.getValue() as string).toLocaleString(),
  },
];

const IpTable = memo(
  ({ data, title = "" }: { data: NetworkTypeIpModel[]; title?: string }) => {
    const { toast } = useToast();

    const [removeOpen, toggleRemoveOpen] = useToggleState(false);

    const [updateOpen, toggleUpdateOpen] = useToggleState(false);

    const [currentRow, setCurrentRow] = useState<NetworkTypeIpModel | null>(
      null
    );

    const [remove, removeLoading] = useSocketAction(["find_network"]);

    console.log("ip-table");

    const handleOnDelete = async () => {
      const result = await remove("delete_ip", currentRow);

      if (result.success) {
        toast({ title: `${CONSTANT.DELETE_SUCCESS}` });
        toggleRemoveOpen();
      } else {
        toast({ title: `${CONSTANT.DELETE_FAILD}: ${result.message}` });
      }
    };

    const [update, loading] = useSocketAction(["find_network"]);

    const handleOnUpdate = async (data: NetworkTypeIpModel) => {
      const result = await update("update_ip", data);
      if (result.success) {
        toast({ title: `${CONSTANT.UPDATE_SUCCESS}` });
        toggleUpdateOpen();
      } else {
        toast({ title: `${CONSTANT.UPDATE_FAILD}: ${result.message}` });
      }
    };

    const table = useShadcnReactTable({
      data,
      columns,
      enableSelect: true,
      customActions: [
        {
          title: CONSTANT.EDIT,
          icon: <Edit size={16} />,
          onClick: ({ row }) => (
            toggleUpdateOpen(), setCurrentRow(row.original)
          ),
        },
        {
          className: "text-red-500 hover:text-red-400",
          title: CONSTANT.DELETE,
          icon: <Delete size={16} className="red-500" />,
          onClick: ({ row }) => (
            toggleRemoveOpen(), setCurrentRow(row.original)
          ),
        },
      ],
      toolbar: (table) => (
        <ShadcnReactTableToolbar
          customFeture={<CustomBreadcrumb data={[{ title }]} />}
          table={table}
        />
      ),
    });

    return (
      <>
        <ShadcnReactTable table={table} />

        {/* delete comfirm */}
        <ComfirmDialog
          open={removeOpen}
          onOpenChange={toggleRemoveOpen}
          title={`${CONSTANT.DELETE}`}
          desc={`${CONSTANT.DELETE}`}
          isLoading={removeLoading}
          handleConfirm={handleOnDelete}
        />

        {currentRow && (
          <IpDialog
            title={CONSTANT.UPDATE}
            description={"l"}
            open={updateOpen}
            onOpenChange={toggleUpdateOpen}
            defaultValues={currentRow}
            loading={loading}
            onSubmit={handleOnUpdate}
          />
        )}
      </>
    );
  }
);

export default IpTable;
