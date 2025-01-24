import { Form } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import FormInput from "@/components/form-input";
import { CONSTANT } from "@/lib/constant";
import LoadingButton from "@/components/loading-button";
import { useSocketAction } from "@/hooks/useFetchData";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import { userShecma } from "@/feature/user/shecma";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

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

  const handleOnSubmit = async () => {
    const result = await login("login", form.getValues());

    if (result.success) {
      navigate("/home");
      toast({ title: `${CONSTANT.LOGIN_SUCCESS}` });
    } else {
      toast({ title: `${CONSTANT.LOGIN_FAILD}: ${result.message}` });
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-full w-full bg-gray-100">
      <Avatar className="size-16">
        <AvatarImage src={"./hamster.png"} alt="hamster" />
        <AvatarFallback>Hamster</AvatarFallback>
      </Avatar>

      <span className="text-2xl font-thin text-center py-4">
        Sign in to Hamster
      </span>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleOnSubmit)}
          className="flex justify-center flex-col gap-3 w-80 p-4 py-6 bg-white rounded-xl"
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

          <LoadingButton
            className="w-full mt-3"
            loading={loading}
            type="submit"
          >
            {CONSTANT.LOGIN}
          </LoadingButton>
        </form>
      </Form>
    </div>
  );
};

export default Login;
