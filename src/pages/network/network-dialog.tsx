import CustomDialog, {
  type CustomDialogProps,
} from "@/components/custom-dialog";
import { Form } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import FormSelect, { type SelectItemData } from "@/components/form-select";
import FormInput from "@/components/form-input";
import { networkSchema, NetworkTypeWithId } from "@/types/network";
import { z } from "zod";
import { CONSTANT } from "@/lib/constant";
import { Button } from "@/components/ui/button";
import RequiredLabel from "@/components/required-label";
import FormInputarea from "@/components/form-inputarea";
import LoadingButton from "@/components/loading-button";

type NetworkType = z.infer<typeof networkSchema>;

export interface NetworkDialogProps extends CustomDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  data: SelectItemData[];
  onSubmit?: (values: NetworkType | NetworkTypeWithId) => Promise<void>;
  defaultValues?: NetworkTypeWithId;
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
  const form = useForm<NetworkType>({
    values: defaultValues,
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

  const handleSubmit = (data: NetworkType | NetworkTypeWithId) =>
    onSubmit && onSubmit(data);

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

          <FormInputarea label={CONSTANT.REMARK} name="remark" />

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

export default NetworkDialog;
