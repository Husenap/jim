import BackButton from "@/components/back-button";
import CreateExerciseDrawer from "@/components/exercise-list/create/create-exercise-drawer";
import ExercisesFilter from "@/components/exercise-list/exercises-filter";
import { Button, Divider } from "@heroui/react";

export default function ExercisesNavbar({
  onClose,
  title,
}: {
  onClose: () => void;
  title?: string;
}) {
  return (
    <>
      <div className="grid grid-cols-4 items-center py-3">
        <BackButton onPress={onClose} />
        <span className="col-span-2 text-center text-sm">
          {title ?? "Exercises"}
        </span>
        <div className="text-right">
          <CreateExerciseDrawer>
            {(onOpen) => (
              <Button onPress={onOpen} color="primary" variant="light">
                Create
              </Button>
            )}
          </CreateExerciseDrawer>
        </div>
      </div>
      <Divider />
      <ExercisesFilter />
    </>
  );
}
