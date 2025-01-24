import { Button } from "@/components/ui/button";
import WorkOrderTemplateDialog from "./workorder-template-dialog";
import { useToggleState } from "@/lib/hooks";
import { CONSTANT } from "@/lib/constant";

const WorkOrder = () => {
  const [createOpen, toggleCreateOpen] = useToggleState(false);

  return (
    <div>
      <div className="">
        <Button onClick={toggleCreateOpen}>Create</Button>
      </div>

      <WorkOrderTemplateDialog
        title={CONSTANT.CREATE_WORKORDER_TEMPLATE}
        description={CONSTANT.CREATE_WORKORDER_TEMPLATE}
        open={createOpen}
        onOpenChange={toggleCreateOpen}
      />
    </div>
  );
};

export default WorkOrder;
