import InputField, { InputFieldProps } from "@/components/input/input-field";
import { useEffect, useRef, useState } from "react";

interface DebouncedInputProps extends InputFieldProps {
  autoSelect?: boolean;
}
export default function DebouncedInput(props: DebouncedInputProps) {
  const {
    value,
    defaultValue,
    onValueChange = () => {},
    autoSelect,
    isReadOnly,
    isMultiLine,
  } = props;
  const [inputValue, setInputValue] = useState(value ?? defaultValue);
  const ref = useRef<HTMLInputElement | HTMLTextAreaElement | null>(null);

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
        } else if (inputValue !== value) {
          onValueChange(inputValue ?? "");
        }
      }}
    />
  );
}
