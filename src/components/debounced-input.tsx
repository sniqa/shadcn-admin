import { useEffect, useState, forwardRef } from "react";
import { Input } from "./ui/input";
// import {} from '@r

export type DebouncedInputProps = {
  value: string | number;
  onChange: (value: string | number) => void;
  debounce?: number;
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange">;

const DebouncedInput = forwardRef(
  (
    {
      value: initialValue,
      onChange,
      debounce = 300,
      ...props
    }: DebouncedInputProps,
    ref
  ) => {
    const [value, setValue] = useState(initialValue);

    useEffect(() => {
      setValue(initialValue);
    }, [initialValue]);

    useEffect(() => {
      const timeout = setTimeout(() => {
        onChange(value);
      }, debounce);

      return () => clearTimeout(timeout);
    }, [value]);

    return (
      <Input
        {...props}
        ref={ref}
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    );
  }
);

export default DebouncedInput;
