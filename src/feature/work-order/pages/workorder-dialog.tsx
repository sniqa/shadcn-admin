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
import { workOrderTemplateShcema } from "../shecma";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

export interface WorkOrderDialogProps extends CustomDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  defaultValues?: WrokOrderTemplateModel | WrokOrderTemplateShecma;
  onSubmit?: (
    values: WrokOrderTemplateModel | WrokOrderTemplateShecma
  ) => Promise<void>;
  loading?: boolean;
}

const WorkOrderDialog = ({
  open,
  onOpenChange,
  loading,
  onSubmit,
  defaultValues,
  ...props
}: WorkOrderDialogProps) => {
  const form = useForm({
    resolver: zodResolver(workOrderTemplateShcema),
    values: defaultValues,
    defaultValues: {
      title: "",
      description: "",
    },
  });

  const handleOnSubmit = () => onSubmit && onSubmit(form.getValues());

  return (
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
            label={<RequiredLabel label={CONSTANT.USERNAME} />}
            control={form.control}
            name="title"
          />

          <FormInput
            label={CONSTANT.NICKNAME}
            control={form.control}
            name="description"
          />

          {loading ? (
            <LoadingButton loading={loading} />
          ) : (
            <Button type="submit" className="w-full">
              {CONSTANT.SUBMIT}
            </Button>
          )}
        </form>
      </Form>
    </CustomDialog>
  );
};

export default WorkOrderDialog;
