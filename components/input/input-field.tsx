import { Input, InputProps } from "@nextui-org/react";
import { useControlledState } from "@react-stately/utils";
import { useCallback } from "react";

export interface InputFieldProps extends InputProps {
  numberOnly?: boolean;
  allowDecimals?: boolean;
  autoSelect?: boolean;
}
export default function InputField(props: InputFieldProps) {
  const {
    onValueChange = () => {},
    numberOnly,
    allowDecimals,
    value,
    defaultValue,
  } = props;

  const handleValueChange = useCallback(
    (v: string | undefined) => {
      onValueChange(v ?? "");
    },
    [onValueChange],
  );
  const [inputValue, setInputValue] = useControlledState<string | undefined>(
    value,
    defaultValue ?? "",
    handleValueChange,
  );

  return (
    <Input
      {...props}
      type="search"
      autoComplete="off"
      value={inputValue}
      onValueChange={(v) => {
        if (numberOnly) {
          v = v.replaceAll(/[^\d,.]/g, "");
        }
        if (allowDecimals) {
          v = v.replaceAll(",", ".");
          if (v.replaceAll(/[^,.]/g, "").length > 1) {
            v = v.slice(0, -1);
          }
        } else {
          v = v.replaceAll(/[,.]/g, "");
        }
        setInputValue(v);
      }}
    />
  );
}
