import { useActiveWorkoutContext } from "@/components/active-workout/active-workout-context";
import InputField from "@/components/input/input-field";
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
} from "@heroui/react";
import type { UseDisclosureReturn } from "@heroui/use-disclosure";
import { useState } from "react";

export default function BodyweightModal({
  disclosure,
}: {
  disclosure: UseDisclosureReturn;
}) {
  const { isOpen, onOpenChange } = disclosure;
  const [value, setValue] = useState("");
  const { activeWorkout, setBodyweight } = useActiveWorkoutContext();

  return (
    <>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        placement="center"
        backdrop="blur"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader>Set Bodyweight</ModalHeader>
              <ModalBody>
                <InputField
                  numberOnly
                  allowDecimals
                  label="Today's Bodyweight"
                  value={value?.toString() ?? ""}
                  onValueChange={setValue}
                />
                <Button
                  color="primary"
                  isDisabled={value.length <= 0}
                  onPress={() => {
                    setBodyweight({
                      workoutId: activeWorkout!._id,
                      bodyweight: parseFloat(value) || undefined,
                    });
                    onClose();
                  }}
                >
                  Set Bodyweight
                </Button>
                <Button variant="light" color="primary" onPress={onClose}>
                  Cancel
                </Button>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
