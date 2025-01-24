import CustomDialog, { CustomDialogProps } from "@/components/custom-dialog";
import FormInput from "@/components/form-input";
import FormInputarea from "@/components/form-inputarea";
import FormSelect from "@/components/form-select";
import LoadingButton from "@/components/loading-button";
import RequiredLabel from "@/components/required-label";
import { Form } from "@/components/ui/form";
import { CONSTANT } from "@/lib/constant";
import { UserModel, UserShecma } from "../types";
import { userShecma } from "../shecma";
import { zodResolver } from "@hookform/resolvers/zod";
import { Gender } from "@prisma/client";
import { useForm } from "react-hook-form";

const selectData = [
  { value: "MALE", label: "男" },
  { value: "FEMALE", label: "女" },
];

export interface UserDialogProps extends CustomDialogProps {
  open: boolean;
  onOpenChange: () => void;
  defaultValues?: UserModel | UserShecma;
  onSubmit?: (values: UserModel | UserShecma) => Promise<void>;
  loading?: boolean;
}

const UserDialog = ({
  open,
  onOpenChange,
  loading,
  onSubmit,
  defaultValues,
  ...props
}: UserDialogProps) => {
  const form = useForm({
    resolver: zodResolver(userShecma),
    values: defaultValues,
    defaultValues: {
      username: "",
      password: "",
      department: "",
      gender: Gender.MALE,
      nickname: "",
      avatar: "",
      remark: "",
    },
  });

  const handleOnSubmit = () => onSubmit && onSubmit(form.getValues());

  return (
    <CustomDialog
      {...props}
      open={open}
      onOpenChange={() => {
        onOpenChange();
        form.reset();
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
            name="username"
          />

          <FormInput
            label={CONSTANT.NICKNAME}
            control={form.control}
            name="nickname"
          />

          <div className="grid grid-cols-2 gap-2">
            <FormInput
              label={CONSTANT.DEPARTMENT}
              control={form.control}
              name="department"
            />

            <FormSelect
              label={CONSTANT.GENDER}
              control={form.control}
              name="gender"
              data={selectData}
              defaultValue={Gender.MALE}
            />
          </div>

          <FormInput
            label={<RequiredLabel label={CONSTANT.PASSWORD} />}
            control={form.control}
            name="password"
            type="password"
          />

          <FormInputarea
            label={CONSTANT.REMARK}
            control={form.control}
            name="remark"
          />

          <LoadingButton loading={loading} type="submit" className="w-full">
            {CONSTANT.SUBMIT}
          </LoadingButton>
        </form>
      </Form>
    </CustomDialog>
  );
};

export default UserDialog;
