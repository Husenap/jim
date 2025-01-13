import { useActiveWorkoutContext } from "@/components/active-workout/active-workout-context";
import { isBodyweightExercise } from "@/utils/workout/exercise";
import {
  Button,
  Drawer,
  DrawerBody,
  DrawerContent,
  Menu,
  MenuItem,
  useDisclosure,
} from "@nextui-org/react";
import { ArrowUpDown, Ellipsis, Plus, Replace, Scale, X } from "lucide-react";

export default function ExerciseMenu({
  exerciseIndex,
}: {
  exerciseIndex: number;
}) {
  const { activeWorkout, exercises, removeExercise } =
    useActiveWorkoutContext();
  const { isOpen, onOpenChange, onOpen } = useDisclosure();
  const exercise = exercises![exerciseIndex];
  return (
    <>
      <Button onPress={onOpen} isIconOnly variant="light" size="md">
        <Ellipsis size={20} />
      </Button>
      <Drawer
        hideCloseButton
        isDismissable
        placement="bottom"
        isOpen={isOpen}
        onOpenChange={onOpenChange}
      >
        <DrawerContent>
          {(onClose) => (
            <DrawerBody className="p-4">
              <Menu
                className="iphone-safe-inset"
                disabledKeys={[
                  "reorder",
                  "replace",
                  "update-bodyweight",
                  "add-superset",
                  "remove-superset",
                ]}
                onClose={onClose}
                closeOnSelect
              >
                <>
                  <MenuItem
                    startContent={<ArrowUpDown />}
                    key="reorder"
                    title="Reorder Exercises"
                  />
                  <MenuItem
                    startContent={<Replace />}
                    key="replace"
                    title="Replace Exercise"
                  />
                  {isBodyweightExercise(exercise.exercise.exerciseType) && (
                    <MenuItem
                      startContent={<Scale />}
                      key="update-bodyweight"
                      title="Update Bodyweight"
                    />
                  )}
                  <MenuItem
                    startContent={<Plus />}
                    key="add-superset"
                    title="Add to Superset"
                  />
                  <MenuItem
                    startContent={<X />}
                    key="remove-superset"
                    title="Remove from Superset"
                  />
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
                </>
              </Menu>
            </DrawerBody>
          )}
        </DrawerContent>
      </Drawer>
    </>
  );
}
