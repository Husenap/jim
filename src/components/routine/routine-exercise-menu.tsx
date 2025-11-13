import DrawerMenu from "@/components/drawer-menu/drawer-menu";
import DrawerMenuContent from "@/components/drawer-menu/drawer-menu-content";
import DrawerMenuTrigger from "@/components/drawer-menu/drawer-menu-trigger";
import ExercisesDrawer from "@/components/exercise-list/exercises-drawer";
import { useRoutineContext } from "@/components/routine/routine-context";
import SupersetDrawer from "@/components/superset/superset-drawer";
import { Doc } from "@/convex/_generated/dataModel";
import { Button, MenuItem, useDisclosure } from "@heroui/react";
import { Ellipsis, Plus, Replace, X } from "lucide-react";

export default function RoutineExerciseMenu({
  exerciseIndex,
}: {
  exerciseIndex: number;
}) {
  const replaceDisclosure = useDisclosure();
  const supersetDisclosure = useDisclosure();
  const { exercises, setExercises } = useRoutineContext();

  const exercise = exercises[exerciseIndex];

  const onSelect = (e: Doc<"exercises">) => {
    setExercises(
      exercises.map((props, index) =>
        index === exerciseIndex ? { ...props, exercise: e } : { ...props },
      ),
    );
  };

  const removeSupersetIfSingle = (superset?: number) => {
    const count = exercises.reduce(
      (acc, e) => acc + (e.superset === superset ? 1 : 0),
      0,
    );
    if (count === 1) {
      for (let i = 0; i < exercises.length; i++) {
        if (exercises[i].superset === superset) {
          exercises[i].superset = undefined;
        }
      }
    }
  };

  const updateSuperset = (exerciseIndex: number, withIndex?: number) => {
    if (withIndex !== undefined) {
      if (exercises[withIndex].superset === undefined) {
        const newSupersetIndex =
          Math.max(...exercises.map((e) => e.superset ?? -1)) + 1;
        exercises[exerciseIndex].superset = newSupersetIndex;
        exercises[withIndex].superset = newSupersetIndex;
      } else {
        exercises[exerciseIndex].superset = exercises[withIndex].superset;
      }
    } else {
      const superset = exercises[exerciseIndex].superset;
      exercises[exerciseIndex].superset = undefined;
      removeSupersetIfSingle(superset);
    }
    setExercises([...exercises]);
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
            startContent={<Replace />}
            key="replace"
            title="Replace Exercise"
            onPress={() => {
              replaceDisclosure.onOpen();
            }}
          />
          {exercise.superset !== undefined ? (
            <MenuItem
              startContent={<X />}
              key="remove-superset"
              title="Remove from Superset"
              onPress={() => {
                updateSuperset(exerciseIndex, undefined);
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
              const [removedExercise] = exercises.splice(exerciseIndex, 1);
              if (removedExercise.superset !== undefined) {
                removeSupersetIfSingle(removedExercise.superset);
              }
              setExercises([...exercises]);
            }}
          />
        </DrawerMenuContent>
      </DrawerMenu>

      <ExercisesDrawer
        title="Replace Exercise"
        onSelect={onSelect}
        disclosure={replaceDisclosure}
      />

      <SupersetDrawer
        disclosure={supersetDisclosure}
        exerciseIndex={exerciseIndex}
        onSelect={(index) => updateSuperset(exerciseIndex, index)}
        exercises={exercises!.map((e) => ({
          name: e.exercise.name,
          superset: e.superset,
        }))}
      />
    </>
  );
}
