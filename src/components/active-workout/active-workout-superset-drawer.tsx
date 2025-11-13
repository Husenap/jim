import { useActiveWorkoutContext } from "@/components/active-workout/active-workout-context";
import SupersetDrawer from "@/components/superset/superset-drawer";
import type { UseDisclosureReturn } from "@heroui/use-disclosure";

export default function ActiveWorkoutSupersetDrawer({
  disclosure,
  exerciseIndex,
}: {
  disclosure: UseDisclosureReturn;
  exerciseIndex: number;
}) {
  const { activeWorkout, exercises, updateSuperset } =
    useActiveWorkoutContext();

  return (
    <>
      <SupersetDrawer
        disclosure={disclosure}
        exerciseIndex={exerciseIndex}
        onSelect={(index) =>
          updateSuperset({
            id: activeWorkout!._id,
            exerciseIndex,
            withIndex: index,
          })
        }
        exercises={exercises!.map((e) => ({
          name: e.exercise.name,
          superset: e.superset,
        }))}
      />
    </>
  );
}
