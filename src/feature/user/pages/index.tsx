import { UserModel, UserShecma } from "../types";
import UserTable from "./user-table";
import { useSocketLoaderData, useSocketAction } from "@/hooks/useFetchData";
import UserDialog from "./user-dialog";
import { useToggleState } from "@/lib/hooks";
import { CONSTANT } from "@/lib/constant";
import { useToast } from "@/hooks/use-toast";

const UserPage = () => {
  const { toast } = useToast();

  const [createOpen, toggleCreateOpen] = useToggleState(false);

  const { data: userData } = useSocketLoaderData<UserModel[]>(
    "find_users",
    null
  );

  const [createUser, createLoading] = useSocketAction(["find_users"]);

  const handleOnCreate = async (data: UserModel | UserShecma) => {
    const result = await createUser("create_user", {
      ...data,
      gender: data.gender,
    });
    if (result.success) {
      toggleCreateOpen();
      toast({ title: `${CONSTANT.CREATE_SUCCESS}` });
    } else {
      toast({ title: `${CONSTANT.CREATE_FAILD}: ${result.message}` });
    }
  };

  return (
    <div className="p-4">
      <UserTable data={userData || []} onCreate={toggleCreateOpen} />

      <UserDialog
        open={createOpen}
        onOpenChange={toggleCreateOpen}
        title={CONSTANT.CREATE_USER}
        description={"o"}
        onSubmit={handleOnCreate}
        loading={createLoading}
      />
    </div>
  );
};

export default UserPage;
