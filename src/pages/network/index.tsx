import { useMemo, useState } from "react";
import NetworkDialog from "./network-dialog";
import { useSocketLoaderData } from "@/hooks/use-socket-loader-data";
import { useSocketAction } from "@/hooks/use-socket-action";
import { type NetworkTypeSchema, NetworkTypeModel } from "@/types/network";
import { Button } from "@/components/ui/button";
import { Tree, TreeDataItem } from "@/components/ui/tree-view2";
import { CONSTANT } from "@/lib/constant";
import IpTable from "./ip-table";
import { SelectItemData } from "@/components/form-select";

const Network = () => {
  const [updateOpen, setUpdateOpen] = useState(false);
  const [createOpen, setCreateOpen] = useState(false);

  const [currentRow, setCurrentRow] = useState<NetworkTypeModel | null>(null);

  const { data: networkData, refulsh } = useSocketLoaderData("find_network", {
    where: { parentId: null },
    include: {
      children: {
        include: { children: true },
      },
      ips: true,
    },
  });

  const { data: networkSelectData } = useSocketLoaderData("find_network", null);

  const [create, createLoading] = useSocketAction(refulsh);

  const [remove] = useSocketAction(refulsh);

  const [update, updateLoading] = useSocketAction(refulsh);

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
      console.log(result.data);
      setCreateOpen((o) => !o);
    } else {
      console.log(result.message);
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
        console.log(result.data);
        // setCreateOpen((o) => !o);
      } else {
        console.log(result.message);
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
      setUpdateOpen((o) => !o);
      console.log(result.data);
      // setCreateOpen((o) => !o);
    } else {
      console.log(result.message);
    }
  };

  return (
    <div className="w-full h-full flex">
      <div className="bg-white dark:bg-slate-700 w-72 h-full flex flex-col">
        <div className="">
          <Button variant={"ghost"} onClick={() => setCreateOpen((o) => !o)}>
            create
          </Button>
          <Button variant={"ghost"} onClick={() => setUpdateOpen((o) => !o)}>
            update
          </Button>
          <Button variant={"ghost"} onClick={handleOnDelete}>
            delete
          </Button>
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
          onOpenChange={() => setCreateOpen((o) => !o)}
          data={selectData}
          loading={createLoading}
          onSubmit={(values) => handleOnCreate(values as NetworkTypeSchema)}
        />

        {/* update */}
        {currentRow && (
          <NetworkDialog
            title={CONSTANT.UPDATE_NETWORK}
            description={"l"}
            open={updateOpen}
            onOpenChange={() => setUpdateOpen((o) => !o)}
            data={selectDataWithoutCurrentRow}
            defaultValues={currentRow}
            loading={updateLoading}
            onSubmit={(values) => handleOnUpdate(values as NetworkTypeModel)}
          />
        )}
      </div>

      <div className="w-full h-full p-2">
        <IpTable data={currentRow?.ips || []} title={currentRow?.name} />
      </div>
    </div>
  );
};

export default Network;
