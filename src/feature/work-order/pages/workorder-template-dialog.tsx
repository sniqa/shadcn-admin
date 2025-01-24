import CustomDialog, { CustomDialogProps } from "@/components/custom-dialog";
import FormInput from "@/components/form-input";
// import FormInputarea from "@/components/form-inputarea";
// import FormSelect from "@/components/form-select";
import LoadingButton from "@/components/loading-button";
import RequiredLabel from "@/components/required-label";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { CONSTANT } from "@/lib/constant";
import { WrokOrderTemplateModel, WrokOrderTemplateShecma } from "../types";
import { workOrderTemplateShecma } from "../shecma";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useFieldArray } from "react-hook-form";
import FormSelect from "@/components/form-select";
import { WorkOrderRole } from "@prisma/client";
import FormMultipleSelector from "@/components/form-multiple-selector";
import { useSocketLoaderData } from "@/hooks/useFetchData";
import { useMemo, useState } from "react";
import { Plus, Trash } from "lucide-react";
import { nanoid } from "nanoid";

const roleSelect = [
  { value: WorkOrderRole.PROPOSER, label: "发起人" },
  { value: WorkOrderRole.COPY, label: "抄送" },
  { value: WorkOrderRole.VETTING, label: "审批" },
  // { value: WorkOrderRole.COMFIRM, label: "确认" },
];

export interface WorkOrderTemplateDialogProps extends CustomDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  defaultValues?: WrokOrderTemplateModel | WrokOrderTemplateShecma;
  onSubmit?: (
    values: WrokOrderTemplateModel | WrokOrderTemplateShecma
  ) => Promise<void>;
  loading?: boolean;
}

const WorkOrderTemplateDialog = ({
  open,
  onOpenChange,
  defaultValues,
  onSubmit,
  loading,
  ...props
}: WorkOrderTemplateDialogProps) => {
  const { data: users } = useSocketLoaderData("find_users", null);

  const [nodes, setNodes] = useState([nanoid()]);

  const usersSelect = useMemo(
    () =>
      users
        ? users.map((user) => ({ value: user.id, label: user.username }))
        : [],
    [users]
  );

  const form = useForm({
    resolver: zodResolver(workOrderTemplateShecma),
    values: defaultValues,
    defaultValues: {
      title: "",
      description: "",
    },
  });

  const { fields, append, prepend, remove, swap, move, insert } = useFieldArray(
    {
      control: form.control,
      name: "WorkOrderTemplateNode",
    }
  );

  const handleOnSubmit = () => {
    console.log(form.getValues());
  };

  return (
    <>
      <CustomDialog
        {...props}
        open={open}
        onOpenChange={(open) => {
          form.reset();
          onOpenChange(open);
        }}
      >
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleOnSubmit)}
            className="flex flex-col gap-2"
          >
            <FormInput
              label={<RequiredLabel label={CONSTANT.TITLE} />}
              control={form.control}
              name="title"
            />

            {fields.map((field, index) => {
              const isLast = index === nodes.length - 1;

              return (
                <div
                  className="flex justify-between items-end gap-2"
                  key={field.id}
                >
                  <div className="flex gap-2 w-full">
                    <FormSelect
                      data={roleSelect}
                      label={<RequiredLabel label={CONSTANT.WORKORDER_ROLE} />}
                      control={form.control}
                      name={`WorkOrderTemplateNode.${index}.workOrderRole`}
                      className="min-w-24 w-24"
                    />

                    <FormMultipleSelector
                      data={usersSelect}
                      label={<RequiredLabel label={CONSTANT.WORKORDER_ROLE} />}
                      control={form.control}
                      name={`WorkOrderTemplateNode.${index}.users`}
                      className="flex-grow"
                    />
                  </div>

                  <div className="">
                    <Button
                      variant={"outline"}
                      size={"icon"}
                      className="size-9"
                      onClick={(e) => {
                        e.preventDefault();
                        return isLast
                          ? setNodes((nodes) => [...nodes, nanoid()])
                          : setNodes((nodes) =>
                              nodes.filter((_, i) => i !== index)
                            );
                      }}
                    >
                      {isLast ? <Plus /> : <Trash />}
                    </Button>
                  </div>
                </div>
              );
            })}

            {/* process
            {nodes.map((node, index) => {
              const isLast = index === nodes.length - 1;

              return (
                <div
                  className="flex justify-between items-end gap-2"
                  key={node}
                >
                  <div className="flex gap-2 w-full">
                    <FormSelect
                      data={roleSelect}
                      label={<RequiredLabel label={CONSTANT.WORKORDER_ROLE} />}
                      control={form.control}
                      name="WorkOrderTemplateNode.workOrderRole "
                      className="min-w-24 w-24"
                    />

                    <FormMultipleSelector
                      data={usersSelect}
                      label={<RequiredLabel label={CONSTANT.WORKORDER_ROLE} />}
                      control={form.control}
                      name="WorkOrderTemplateNode.users"
                      className="flex-grow"
                    />
                  </div>

                  <div className="">
                    <Button
                      variant={"outline"}
                      size={"icon"}
                      className="size-9"
                      onClick={(e) => {
                        e.preventDefault();
                        return isLast
                          ? setNodes((nodes) => [...nodes, nanoid()])
                          : setNodes((nodes) =>
                              nodes.filter((_, i) => i !== index)
                            );
                      }}
                    >
                      {isLast ? <Plus /> : <Trash />}
                    </Button>
                  </div>
                </div>
              );
            })} */}

            {/* button */}
            <LoadingButton loading={loading} type="submit" className="w-full">
              {CONSTANT.SUBMIT}
            </LoadingButton>
          </form>
        </Form>
      </CustomDialog>
    </>
  );
};

export default WorkOrderTemplateDialog;
