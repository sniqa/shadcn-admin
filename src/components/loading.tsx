import { Loader2 } from "lucide-react";
import { Button } from "./ui/button";

const Loading = () => {
  return (
    <div className="w-full h-full flex justify-center items-center">
      <Button disabled variant={"ghost"}>
        <Loader2 className="animate-spin" />
        Please wait
      </Button>
    </div>
  );
};

export default Loading;
