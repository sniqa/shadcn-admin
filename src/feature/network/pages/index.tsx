import { useMemo, useState } from "react";
import NetworkDialog from "./network-dialog";
import { useSocketLoaderData, useSocketAction } from "@/hooks/useFetchData";
// import { useSocketAction } from "@/hooks/use-socket-action";
import { type NetworkTypeSchema, NetworkTypeModel } from "../types";
import { Button } from "@/components/ui/button";
import { Tree, TreeDataItem } from "@/components/ui/tree-view2";
import { CONSTANT } from "@/lib/constant";
import IpTable from "./ip-table";
import { SelectItemData } from "@/components/form-select";
import ComfirmDialog from "@/components/comfirm-dialog";
import { useToast } from "@/hooks/use-toast";
import { useToggleState } from "@/lib/hooks";
import { FilePenLine, FilePlus, FileX } from "lucide-react";
import { CustomTooltip } from "@/components/custom-tooltip";

const Network = () => {
  const { toast } = useToast();

  console.log("network-index");

  const [updateOpen, toggleUpdateOpen] = useToggleState(false);
  const [createOpen, toggleCreateOpen] = useToggleState(false);
  const [deleteOpen, toggleDeleteOpen] = useToggleState(false);

  const [currentRow, setCurrentRow] = useState<NetworkTypeModel | null>(null);

  const { data: networkData } = useSocketLoaderData<NetworkTypeModel[]>(
    "find_network",
    {
      where: { parentId: null },
      include: {
        children: {
          include: { children: true },
        },
        ips: true,
      },
    }
  );

  const ipData = useMemo(() => {
    const id = currentRow?.id;

    const n = networkData || [];

    if (id && n.length > 0) {
      return n.find((d) => d.id === id)?.ips || [];
    }

    return [];
  }, [networkData, currentRow]);

  const { data: networkSelectData } = useSocketLoaderData("find_network", null);

  const [create, createLoading] = useSocketAction(["find_network"]);

  const [remove] = useSocketAction(["find_network"]);

  const [update, updateLoading] = useSocketAction(["find_network"]);

  const selectData: SelectItemData[] = useMemo(() => {
    return networkSelectData
      ? networkSelectData.map((d: NetworkTypeModel) => ({
          label: d.name,
          value: d.id,
        }))
      : [];
  }, [networkSelectData]);

  const selectDataWithoutCurrentRow = useMemo(() => {
    return [
      { label: "", value: null },
      ...selectData.filter((d) => d.value !== currentRow?.id),
    ];
  }, [selectData, currentRow]);

  //create
  const handleOnCreate = async (values: NetworkTypeSchema) => {
    if (values.parentId) {
      values.parentId = Number(values.parentId);
    }
    const result = await create("create_network", values);
    if (result.success) {
      toast({ title: `${CONSTANT.CREATE_SUCCESS}` });
      toggleCreateOpen();
    } else {
      toast({ title: `${CONSTANT.CREATE_FAILD}: ${result.message}` });
    }
  };

  //delete
  const handleOnDelete = async () => {
    const id = currentRow?.id;

    if (!id) {
      return;
    } else {
      const result = await remove("delete_network", { id });
      if (result.success) {
        toggleDeleteOpen();
        toast({ title: `${CONSTANT.DELETE_SUCCESS}` });
      } else {
        toast({ title: `${CONSTANT.DELETE_FAILD}: ${result.message}` });
      }
    }
  };

  //update
  const handleOnUpdate = async (values: NetworkTypeModel) => {
    if (values.parentId) {
      values.parentId = Number(values.parentId);
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { children, ips, ...data } = values;

    const result = await update("update_network", data);
    if (result.success) {
      toggleUpdateOpen();
      toast({ title: `${CONSTANT.UPDATE_SUCCESS}` });
    } else {
      toast({ title: `${CONSTANT.UPDATE_FAILD}: ${result.message}` });
    }
  };

  return (
    <div className="w-full h-full flex">
      <div className="bg-white dark:bg-slate-700 w-72 h-full flex flex-col">
        <div className="flex justify-end h-12 p-2 items-center gap-1">
          {/* create button */}
          <CustomTooltip label={CONSTANT.CREATE_NETWORK}>
            <Button
              variant={"outline"}
              size={"icon"}
              className="size-8"
              onClick={toggleCreateOpen}
            >
              <FilePlus />
            </Button>
          </CustomTooltip>

          {/* update button */}
          {currentRow && (
            <>
              <CustomTooltip label={CONSTANT.UPDATE_NETWORK}>
                <Button
                  variant={"outline"}
                  size={"icon"}
                  className="size-8"
                  onClick={toggleUpdateOpen}
                >
                  <FilePenLine />
                </Button>
              </CustomTooltip>

              {/* delete button */}
              <CustomTooltip label={CONSTANT.DELETE_NETWORK}>
                <Button
                  variant={"outline"}
                  className="text-red-500 size-8"
                  size={"icon"}
                  onClick={toggleDeleteOpen}
                >
                  <FileX />
                </Button>
              </CustomTooltip>
            </>
          )}
        </div>

        <Tree
          data={(networkData as unknown as TreeDataItem[]) || []}
          className="h-full"
          onSelectChange={(values) =>
            setCurrentRow(values as unknown as NetworkTypeModel)
          }
        />

        {/* create */}
        <NetworkDialog
          title={CONSTANT.CREATE_NETWORK}
          description={"o"}
          open={createOpen}
          onOpenChange={toggleCreateOpen}
          data={selectData}
          loading={createLoading}
          onSubmit={(values) => handleOnCreate(values as NetworkTypeSchema)}
        />

        {currentRow && (
          <>
            {/* update */}
            <NetworkDialog
              title={CONSTANT.UPDATE_NETWORK}
              description={"l"}
              open={updateOpen}
              onOpenChange={toggleUpdateOpen}
              data={selectDataWithoutCurrentRow}
              defaultValues={currentRow}
              loading={updateLoading}
              onSubmit={(values) => handleOnUpdate(values as NetworkTypeModel)}
            />

            <ComfirmDialog
              open={deleteOpen}
              onOpenChange={toggleDeleteOpen}
              title={CONSTANT.DELETE}
              desc={`${CONSTANT.DELETE}: ${currentRow.name}?`}
              handleConfirm={handleOnDelete}
            />
          </>
        )}
      </div>

      <div className="w-full h-full p-2">
        <IpTable data={ipData} title={currentRow?.name} />
      </div>
    </div>
  );
};

export default Network;
