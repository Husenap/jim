import BodyweightModal from "@/app/(member-area)/workout/live/[workoutId]/(dialogs)/bodyweight-modal";
import SupersetDrawer from "@/app/(member-area)/workout/live/[workoutId]/(dialogs)/superset-drawer";
import { useActiveWorkoutContext } from "@/components/active-workout/active-workout-context";
import DrawerMenu from "@/components/drawer-menu/drawer-menu";
import DrawerMenuContent from "@/components/drawer-menu/drawer-menu-content";
import DrawerMenuTrigger from "@/components/drawer-menu/drawer-menu-trigger";
import ExercisesDrawer from "@/components/exercise-list/exercises-drawer";
import { Doc } from "@/convex/_generated/dataModel";
import { isBodyweightExercise } from "@/utils/workout/exercise";
import { Button, MenuItem, useDisclosure } from "@heroui/react";
import { ArrowUpDown, Ellipsis, Plus, Replace, Scale, X } from "lucide-react";

export default function ExerciseMenu({
  exerciseIndex,
}: {
  exerciseIndex: number;
}) {
  const {
    activeWorkout,
    exercises,
    removeExercise,
    replaceExercise,
    updateSuperset,
  } = useActiveWorkoutContext();
  const exercise = exercises![exerciseIndex];

  const bodyweightDisclosure = useDisclosure();
  const supersetDisclosure = useDisclosure();
  const exercisesDrawerDisclosure = useDisclosure();

  const onReplaceExercise = async (e: Doc<"exercises">) => {
    replaceExercise({
      workoutId: activeWorkout!._id,
      exerciseIndex,
      exerciseId: e._id,
    });
  };

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
            onPress={exercisesDrawerDisclosure.onOpen}
          />
          {isBodyweightExercise(exercise.exercise.exerciseType) && (
            <MenuItem
              startContent={<Scale />}
              key="update-bodyweight"
              title="Update Bodyweight"
              onPress={bodyweightDisclosure.onOpen}
            />
          )}
          {exercise.superset !== undefined ? (
            <MenuItem
              startContent={<X />}
              key="remove-superset"
              title="Remove from Superset"
              onPress={() => {
                updateSuperset({
                  id: activeWorkout!._id,
                  exerciseIndex,
                  withIndex: undefined,
                });
              }}
            />
          ) : (
            <MenuItem
              startContent={<Plus />}
              key="add-superset"
              title="Add to Superset"
              onPress={supersetDisclosure.onOpen}
            />
          )}
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
      <ExercisesDrawer
        onSelect={onReplaceExercise}
        disclosure={exercisesDrawerDisclosure}
      />
      <BodyweightModal disclosure={bodyweightDisclosure} />
      <SupersetDrawer
        disclosure={supersetDisclosure}
        exerciseIndex={exerciseIndex}
      />
    </>
  );
}
