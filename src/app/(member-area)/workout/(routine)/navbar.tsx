import { useRoutineContext } from "@/components/routine/routine-context";
import { Button } from "@heroui/react";

export default function Navbar({
  titleText,
  confirmText,
  cancelText,
  onCancel,
  onConfirm,
}: {
  titleText: string;
  confirmText?: string;
  cancelText?: string;
  onCancel?: () => void;
  onConfirm?: () => void;
}) {
  const { title, setErrors } = useRoutineContext();
  const onConfirmWithValidation = () => {
    if (title === "") {
      setErrors({ title: "Your routine needs a title." });
      return;
    }
    if (onConfirm) {
      onConfirm();
    }
  };

  return (
    <>
      <div className="grid grid-cols-3 items-center py-3">
        <div className="text-left">
          <Button onPress={onCancel} color="danger" variant="light">
            {cancelText || "Cancel"}
          </Button>
        </div>
        <span className="text-center">{titleText}</span>
        <div className="text-right">
          <Button onPress={onConfirmWithValidation} color="primary">
            {confirmText || "Save"}
          </Button>
        </div>
      </div>
    </>
  );
}
