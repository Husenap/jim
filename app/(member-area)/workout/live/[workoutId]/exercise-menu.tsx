import { useActiveWorkoutContext } from "@/components/active-workout/active-workout-context";
import DrawerMenu from "@/components/drawer-menu/drawer-menu";
import DrawerMenuContent from "@/components/drawer-menu/drawer-menu-content";
import DrawerMenuTrigger from "@/components/drawer-menu/drawer-menu-trigger";
import InputField from "@/components/input/input-field";
import { isBodyweightExercise } from "@/utils/workout/exercise";
import {
  Button,
  MenuItem,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/react";
import type { UseDisclosureReturn } from "@nextui-org/use-disclosure";
import { ArrowUpDown, Ellipsis, Plus, Replace, Scale, X } from "lucide-react";
import { useState } from "react";

export default function ExerciseMenu({
  exerciseIndex,
}: {
  exerciseIndex: number;
}) {
  const { activeWorkout, exercises, removeExercise } =
    useActiveWorkoutContext();
  const exercise = exercises![exerciseIndex];

  const bodyweightDisclosure = useDisclosure();

  return (
    <>
      <DrawerMenu>
        <DrawerMenuTrigger>
          <Button isIconOnly variant="light" size="md">
            <Ellipsis size={20} />
          </Button>
        </DrawerMenuTrigger>
        <DrawerMenuContent ariaLabel="Exercise Menu">
          <MenuItem
            startContent={<ArrowUpDown />}
            key="reorder"
            title="Reorder Exercises"
            className="under-construction"
          />
          <MenuItem
            startContent={<Replace />}
            key="replace"
            title="Replace Exercise"
            className="under-construction"
          />
          {isBodyweightExercise(exercise.exercise.exerciseType) && (
            <MenuItem
              startContent={<Scale />}
              key="update-bodyweight"
              title="Update Bodyweight"
              onPress={bodyweightDisclosure.onOpen}
            />
          )}
          <MenuItem
            startContent={<Plus />}
            key="add-superset"
            title="Add to Superset"
            className="under-construction"
          />
          {/*
                  <MenuItem
                    startContent={<X />}
                    key="remove-superset"
                    title="Remove from Superset"
                    className="under-construction"
                  />
                  */}
          <MenuItem
            startContent={<X />}
            key="delete"
            color="danger"
            className="text-danger"
            title="Remove Exercise"
            onPress={() => {
              removeExercise({
                workoutId: activeWorkout!._id,
                exerciseIndex,
              });
            }}
          />
        </DrawerMenuContent>
      </DrawerMenu>
      <BodyweightModal disclosure={bodyweightDisclosure} />
    </>
  );
}

function BodyweightModal({ disclosure }: { disclosure: UseDisclosureReturn }) {
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
