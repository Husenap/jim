import { Button } from "@nextui-org/react";

export default function Navbar({
  onCancel,
  onSave,
}: {
  onCancel?: () => void;
  onSave?: () => void;
}) {
  return (
    <>
      <div className="grid grid-cols-3 items-center py-3">
        <div className="text-left">
          <Button onPress={onCancel} color="danger" variant="light">
            Cancel
          </Button>
        </div>
        <span className="text-center">Create Routine</span>
        <div className="text-right">
          <Button onPress={onSave} color="primary">
            Save
          </Button>
        </div>
      </div>
    </>
  );
}
