import CustomDialog, {
  type CustomDialogProps,
} from "@/components/custom-dialog";
import { Form } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import FormSelect, { type SelectItemData } from "@/components/form-select";
import FormInput from "@/components/form-input";
import { CONSTANT } from "@/lib/constant";
import RequiredLabel from "@/components/required-label";
import FormInputarea from "@/components/form-inputarea";
import LoadingButton from "@/components/loading-button";
import { type NetworkTypeSchema, type NetworkTypeModel } from "../types";
import { networkSchema } from "../shecma";
import { zodResolver } from "@hookform/resolvers/zod";

export interface NetworkDialogProps extends CustomDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  data: SelectItemData[];
  defaultValues?: NetworkTypeModel;
  onSubmit?: (values: NetworkTypeSchema | NetworkTypeModel) => Promise<void>;
  loading?: boolean;
}

const NetworkDialog = ({
  defaultValues,
  data = [],
  open,
  onSubmit,
  onOpenChange,
  loading,
  ...props
}: NetworkDialogProps) => {
  console.log(defaultValues);

  const form = useForm<NetworkTypeSchema | NetworkTypeModel>({
    values: defaultValues,
    resolver: zodResolver(networkSchema),
    defaultValues: {
      parentId: null,
      name: "",
      startIp: "",
      endIp: "",
      netmask: "",
      gateway: "",
      vlan: "",
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
          <FormSelect
            label={CONSTANT.PARENT}
            control={form.control}
            name="parentId"
            data={data}
          />

          <FormInput
            label={<RequiredLabel label={CONSTANT.NETWORK_NAME} />}
            control={form.control}
            name="name"
          />

          <div className="grid grid-cols-2 gap-2">
            <FormInput
              label={CONSTANT.START_IP_ADDRESS}
              name="startIp"
              control={form.control}
            />
            <FormInput
              label={CONSTANT.END_IP_ADDRESS}
              name="endIp"
              control={form.control}
            />
            <FormInput
              label={CONSTANT.NETMASK}
              name="netmask"
              control={form.control}
            />
            <FormInput
              label={CONSTANT.GATEWAY}
              name="gateway"
              control={form.control}
            />
            <FormInput
              label={CONSTANT.VLAN}
              name="vlan"
              control={form.control}
            />
          </div>

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

export default NetworkDialog;
