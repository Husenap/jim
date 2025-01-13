import { Input, InputProps } from "@nextui-org/react";
import { useEffect, useRef, useState } from "react";

interface DebouncedInputProps extends InputProps {
  numberOnly?: boolean;
  allowDecimals?: boolean;
  autoSelect?: boolean;
}
export default function DebouncedInput(props: DebouncedInputProps) {
  const { value, onValueChange, numberOnly, allowDecimals, autoSelect } = props;
  const [inputValue, setInputValue] = useState(value);
  const ref = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    setInputValue(value);
  }, [value]);

  return (
    <Input
      {...props}
      ref={ref}
      type="search"
      autoComplete="none"
      value={inputValue}
      onValueChange={(v) => {
        if (numberOnly) v = v.replaceAll(/[a-zA-z]/g, "");
        if (allowDecimals) v = v.replaceAll(",", ".");
        else v = v.replaceAll(/[,.]/g, "");
        setInputValue(v);
      }}
      onFocusChange={(isFocused) => {
        if (isFocused) {
          if (autoSelect) ref.current?.setSelectionRange(0, -1);
        } else {
          onValueChange && onValueChange(inputValue ?? "");
        }
      }}
    />
  );
}
