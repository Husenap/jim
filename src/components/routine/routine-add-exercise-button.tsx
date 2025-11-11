import ExercisesDrawer from "@/components/exercise-list/exercises-drawer";
import { useRoutineContext } from "@/components/routine/routine-context";
import { Button } from "@heroui/react";
import { Plus } from "lucide-react";
import { v4 as uuidv4 } from "uuid";

export default function RoutineAddExerciseButton() {
  const { exercises, setExercises } = useRoutineContext();
  return (
    <>
      <ExercisesDrawer
        title="Add Exercise"
        onSelect={(e) =>
          setExercises([...exercises, { exercise: e, id: uuidv4() }])
        }
      >
        {(onOpen) => (
          <Button
            onPress={() => {
              onOpen();
            }}
            color="primary"
            startContent={<Plus />}
          >
            Add exercise
          </Button>
        )}
      </ExercisesDrawer>
    </>
  );
}
