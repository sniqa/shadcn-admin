import MultipleSelector, {
  type Option,
} from "@/components/ui/multiple-selector";
import { ControllerProps, FieldPath, FieldValues } from "react-hook-form";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { cn } from "@/lib/utils";

export type FormMultipleSelectorProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> = {
  data: Option[];
  label?: React.ReactNode;
  description?: React.ReactNode;
  placeholder?: string;
  className?: string;
  onChange?: (options: Option[]) => void;
} & Omit<ControllerProps<TFieldValues, TName>, "render">;

const FormMultipleSelector = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>({
  data,
  label,
  placeholder,
  description,
  className,
  ...props
}: FormMultipleSelectorProps<TFieldValues, TName>) => {
  return (
    <FormField
      {...props}
      render={({ field }) => (
        <FormItem className="w-full">
          {label && <FormLabel>{label}</FormLabel>}
          <FormControl>
            <MultipleSelector
              defaultOptions={data}
              placeholder={placeholder}
              {...field}
              className={cn("w-full", className)}
              onChange={(options) => field.onChange(options)}
              emptyIndicator={
                <p className="text-center text-lg leading-10 text-gray-600 dark:text-gray-400">
                  no results found.
                </p>
              }
            />
          </FormControl>
          {description && <FormDescription>{description}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default FormMultipleSelector;
