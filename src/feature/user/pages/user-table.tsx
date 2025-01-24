import ComfirmDialog from "@/components/comfirm-dialog";
import {
  ShadcnReactTable,
  useShadcnReactTable,
  ColumnDef,
  ShadcnReactTableToolbar,
} from "@/components/table2";
import { toast } from "@/hooks/use-toast";
import { useSocketAction } from "@/hooks/useFetchData";
import { CONSTANT } from "@/lib/constant";
import { useToggleState } from "@/lib/hooks";
import { UserModel, UserShecma } from "../types";
import { Delete, Edit, Plus } from "lucide-react";
import { useState } from "react";
import UserDialog from "./user-dialog";
import { Gender } from "@prisma/client";
import { Button } from "@/components/ui/button";
// import { Gender } from "@prisma/client";

const columns: ColumnDef<UserModel>[] = [
  { accessorKey: "username", header: "Username" },
  { accessorKey: "nickname", header: "Nickname" },
  {
    accessorKey: "gender",
    header: "Gender",
    cell: ({ cell }) => (cell.getValue() === Gender.MALE ? "男" : "女"),
  },
  { accessorKey: "avatar", header: "Avatar" },
  { accessorKey: "department", header: "Department" },
  { accessorKey: "remark", header: "REMARK" },
];

export type UserTableProps = {
  data: UserModel[];
  onCreate?: () => void;
};

const UserTable = ({ data, onCreate }: UserTableProps) => {
  const [removeOpen, toggleRemoveOpen] = useToggleState(false);

  const [updateOpen, toggleUpdateOpen] = useToggleState(false);

  const [currentRow, setCurrentRow] = useState<UserModel | null>(null);

  const [removeUser, removeLoading] = useSocketAction(["find_users"]);

  //   delete
  const handleOnDelete = async () => {
    const result = await removeUser("delete_user", currentRow);

    if (result.success) {
      toast({ title: `${CONSTANT.DELETE_SUCCESS}` });
      toggleRemoveOpen();
    } else {
      toast({ title: `${CONSTANT.DELETE_FAILD}: ${result.message}` });
    }
  };

  //   update
  const [update, updateLoading] = useSocketAction(["find_users"]);

  const handleOnUpdate = async (data: UserModel | UserShecma) => {
    console.log(currentRow);

    const result = await update("update_user", {
      ...data,
      // gender: data.gender === Gender.MALE ? Gender.MALE : Gender.FEMALE,
    });
    if (result.success) {
      toast({ title: `${CONSTANT.UPDATE_SUCCESS}` });
      toggleUpdateOpen();
    } else {
      toast({ title: `${CONSTANT.UPDATE_FAILD}: ${result.message}` });
    }
  };

  const table = useShadcnReactTable({
    columns,
    data,
    customActions: [
      {
        title: CONSTANT.EDIT,
        icon: <Edit size={16} />,
        onClick: ({ row }) => (toggleUpdateOpen(), setCurrentRow(row.original)),
      },
      {
        className: "text-red-500 hover:text-red-400",
        title: CONSTANT.DELETE,
        icon: <Delete size={16} className="red-500" />,
        onClick: ({ row }) => (toggleRemoveOpen(), setCurrentRow(row.original)),
      },
    ],
    toolbar: (table) => (
      <ShadcnReactTableToolbar
        customFeture={
          <Button
            variant={"outline"}
            size={"icon"}
            onClick={onCreate}
            className="size-8"
          >
            <Plus />
          </Button>
        }
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
        <UserDialog
          open={updateOpen}
          onOpenChange={toggleUpdateOpen}
          defaultValues={currentRow}
          onSubmit={handleOnUpdate}
          loading={updateLoading}
        />
      )}
    </>
  );
};

export default UserTable;
