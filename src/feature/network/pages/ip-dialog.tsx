import CustomDialog, { CustomDialogProps } from "@/components/custom-dialog";
import FormInput from "@/components/form-input";
import FormInputarea from "@/components/form-inputarea";
import LoadingButton from "@/components/loading-button";
import { Form } from "@/components/ui/form";
import { CONSTANT } from "@/lib/constant";
import { NetworkTypeIpModel } from "../types";
import { useForm } from "react-hook-form";

export type IpDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  defaultValues?: NetworkTypeIpModel;
  onSubmit?: (values: NetworkTypeIpModel) => Promise<void>;
  loading?: boolean;
} & CustomDialogProps;

const IpDialog = ({
  open,
  onOpenChange,
  defaultValues,
  onSubmit,
  loading,
  ...props
}: IpDialogProps) => {
  const form = useForm({
    values: defaultValues,
    defaultValues: {
      ip: "",
      user: "",
      location: "",
      panelNumber: "",
      networkId: null,
      remark: "",
    },
  });

  const handleSubmit = () => onSubmit && onSubmit(form.getValues());

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
          onSubmit={form.handleSubmit(handleSubmit)}
          className="w-full flex flex-col gap-3"
        >
          <FormInput
            label={CONSTANT.IP_ADDRESS}
            name={"ip"}
            control={form.control}
          />

          <FormInput
            label={CONSTANT.USER}
            name={"user"}
            control={form.control}
          />

          <FormInput
            label={CONSTANT.LOCATION}
            name={"location"}
            control={form.control}
          />

          <FormInput
            label={CONSTANT.PANEL_NUMBER}
            name={"panelNumber"}
            control={form.control}
          />

          <FormInputarea
            label={CONSTANT.REMARK}
            name="remark"
            control={form.control}
          />

          <LoadingButton loading={loading} type="submit" className="w-full">
            {CONSTANT.SUBMIT}
          </LoadingButton>
        </form>
      </Form>
    </CustomDialog>
  );
};

export default IpDialog;
