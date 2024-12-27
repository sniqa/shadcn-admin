import { Button, ButtonProps } from "./ui/button";
import { Loader2 } from "lucide-react";

export type LoadingButtonProps = {
  loading?: boolean;
} & ButtonProps;

const LoadingButton = ({ loading, children, ...props }: LoadingButtonProps) => {
  return (
    <Button disabled={loading} {...props}>
      {loading ? (
        <>
          <Loader2 className="animate-spin" />
          Please wait
        </>
      ) : (
        children
      )}
    </Button>
  );
};

export default LoadingButton;
