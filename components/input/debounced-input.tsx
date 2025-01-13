import InputField, { InputFieldProps } from "@/components/input/input-field";
import { useEffect, useRef, useState } from "react";

interface DebouncedInputProps extends InputFieldProps {
  autoSelect?: boolean;
}
export default function DebouncedInput(props: DebouncedInputProps) {
  const { value, onValueChange, autoSelect, isReadOnly } = props;
  const [inputValue, setInputValue] = useState(value);
  const ref = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    setInputValue(value);
  }, [value]);

  return (
    <InputField
      {...props}
      ref={ref}
      type="search"
      autoComplete="none"
      value={inputValue}
      onValueChange={setInputValue}
      onFocusChange={(isFocused) => {
        if (isFocused) {
          if (!isReadOnly && autoSelect) ref.current?.setSelectionRange(0, -1);
        } else {
          onValueChange && onValueChange(inputValue ?? "");
        }
      }}
    />
  );
}
