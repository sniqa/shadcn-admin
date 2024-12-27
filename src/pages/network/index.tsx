import { useMemo, useState } from "react";
import NetworkDialog from "./network-dialog";
import { useSocketLoaderData } from "@/hooks/use-socket-loader-data";
import { useSocketAction } from "@/hooks/use-socket-action";
import { NetworkType, NetworkTypeWithId } from "@/types/network";
import { Button } from "@/components/ui/button";
import { Tree, TreeDataItem } from "@/components/ui/tree-view2";
import { CONSTANT } from "@/lib/constant";
import IpTable from "./ip-table";

const Network = () => {
  const [updateOpen, setUpdateOpen] = useState(false);
  const [createOpen, setCreateOpen] = useState(false);

  const [currentRow, setCurrentRow] = useState<NetworkTypeWithId | null>(null);

  const { data: networkData, refulsh } = useSocketLoaderData(
    "find_network",
    null
  );
  useMemo(() => console.log(networkData), [networkData]);

  const [create, createLoading] = useSocketAction(refulsh);

  const [remove] = useSocketAction(refulsh);

  const [update, updateLoading] = useSocketAction(refulsh);

  const selectData = useMemo(() => {
    return networkData
      ? networkData.map((d) =>
          currentRow?.id === d.id ? {} : { label: d.name, value: d.id }
        )
      : [];
  }, [networkData, currentRow]);

  const handleOnCreate = async (values: NetworkType) => {
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

  const handleOnUpdate = async (values: NetworkTypeWithId) => {
    if (values.parentId) {
      values.parentId = Number(values.parentId);
    }
    const { children, ...data } = values;

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
            setCurrentRow(values as unknown as NetworkTypeWithId)
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
          onSubmit={handleOnCreate}
        />

        {/* update */}
        {currentRow && (
          <NetworkDialog
            title={CONSTANT.UPDATE_NETWORK}
            description={"l"}
            open={updateOpen}
            onOpenChange={() => setUpdateOpen((o) => !o)}
            data={selectData}
            defaultValues={currentRow}
            loading={updateLoading}
            onSubmit={handleOnUpdate}
          />
        )}
      </div>

      <div className="w-full h-full p-2">
        <IpTable data={currentRow?.ips || []} />
      </div>
    </div>
  );
};

export default Network;
