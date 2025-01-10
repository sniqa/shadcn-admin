import { Form } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import FormInput from "@/components/form-input";
import { CONSTANT } from "@/lib/constant";
import LoadingButton from "@/components/loading-button";
import { useSocketAction } from "@/hooks/useFetchData";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import { userShecma } from "@/types/user";

const Login = () => {
  const form = useForm({
    resolver: zodResolver(userShecma),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const navigate = useNavigate();

  const [login, loading] = useSocketAction();

  const handleOnSubmit = async (values: z.infer<typeof userShecma>) => {
    const result = await login("login", values);

    if (result.success) {
      navigate("/home");
      toast({ title: `${CONSTANT.LOGIN_SUCCESS}` });
    } else {
      toast({ title: `${CONSTANT.LOGIN_FAILD}: ${result.message}` });
    }
  };

  return (
    <div className="flex items-center justify-center h-full w-full bg-gray-100">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleOnSubmit)}
          className="flex flex-col gap-3 w-80 p-4 py-6 bg-white rounded-xl"
        >
          <FormInput
            name={"username"}
            control={form.control}
            label={CONSTANT.USERNAME}
          />

          <FormInput
            name="password"
            control={form.control}
            label={CONSTANT.PASSWORD}
            type={"password"}
          />

          <LoadingButton className="w-full mt-3" loading={loading}>
            {CONSTANT.LOGIN}
          </LoadingButton>
        </form>
      </Form>
    </div>
  );
};

export default Login;
