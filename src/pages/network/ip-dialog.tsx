import CustomDialog from "@/components/custom-dialog";
import FormInput from "@/components/form-input";
import { Form } from "@/components/ui/form";
import { CONSTANT } from "@/lib/constant";
import { useForm } from "react-hook-form";

const IpDialog = () => {
  const form = useForm({
    defaultValues: {
      ip: "",
      user: "",
      location: "",
      networkId: null,
      remark: "",
    },
  });

  const handleSubmit = () => {};

  return (
    <CustomDialog>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)}>
          <FormInput label={CONSTANT.COMFIRM} name={"ip"} />
        </form>
      </Form>
    </CustomDialog>
  );
};

export default IpDialog;
