import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { UserRound, LogOut } from "lucide-react";

export type CustomAvatarProps = {
  img?: string;
};

const CustomAvatar = ({
  img = "https://github.com/shadcn.png",
}: CustomAvatarProps) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar className="cursor-pointer">
          <AvatarImage src={img} alt="@shadcn" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-40">
        {/* profile */}
        <DropdownMenuItem>
          Profile
          <DropdownMenuShortcut>
            <UserRound className="size-5" />
          </DropdownMenuShortcut>
        </DropdownMenuItem>
        <DropdownMenuSeparator />

        {/* logout */}
        <DropdownMenuItem>
          Log out
          <DropdownMenuShortcut>
            <LogOut className="size-5" />
          </DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default CustomAvatar;
