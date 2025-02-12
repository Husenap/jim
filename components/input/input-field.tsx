import { Input, InputProps, Textarea, TextAreaProps } from "@heroui/react";
import { useControlledState } from "@react-stately/utils";
import { Ref, useCallback } from "react";

type As<Props = any> = React.ElementType<Props>;
export interface InputFieldProps extends Omit<InputProps, "ref"> {
  numberOnly?: boolean;
  allowDecimals?: boolean;
  autoSelect?: boolean;
  isMultiLine?: boolean;
  ref?: Ref<HTMLInputElement | HTMLTextAreaElement>;
}
export default function InputField(props: InputFieldProps) {
  const {
    onValueChange = () => {},
    numberOnly,
    allowDecimals,
    value,
    defaultValue,
    isMultiLine,
  } = props;

  const { ref, ...otherProps } = props;

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

  const onValueChangeHandler = (v: string) => {
    if (numberOnly) {
      v = v.replaceAll(/[^\d,.]/g, "");
      if (allowDecimals) {
        v = v.replaceAll(",", ".");
        if (v.replaceAll(/[^,.]/g, "").length > 1) {
          v = v.slice(0, -1);
        }
      } else {
        v = v.replaceAll(/[,.]/g, "");
      }
    }
    setInputValue(v);
  };

  if (isMultiLine) {
    return (
      <Textarea
        {...otherProps}
        ref={ref as Ref<HTMLTextAreaElement>}
        type="search"
        autoComplete="off"
        value={inputValue}
        onValueChange={onValueChangeHandler}
        minRows={1}
      />
    );
  } else {
    const r = ref as Ref<HTMLInputElement>;
    return (
      <Input
        {...otherProps}
        ref={ref as Ref<HTMLInputElement>}
        type="search"
        autoComplete="off"
        value={inputValue}
        onValueChange={onValueChangeHandler}
      />
    );
  }
}
