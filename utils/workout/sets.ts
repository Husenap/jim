import { api } from "@/convex/_generated/api";
import { ExerciseFieldsType, SetDataType } from "@/convex/schema";

export default function countSets(
  exercises?: {
    exercise: ExerciseFieldsType,
    sets: SetDataType[]
  }[]
): number {
  let numSets = 0;

  if (!exercises) return numSets;

  for (const { sets } of exercises) {
    for (const set of sets) {
      if (set.done) {
        numSets++;
      }
    }
  }

  return numSets;
}

type SetDataPatch = typeof api.activeWorkouts.updateSet._args["setData"];
export function updateSetData(sets: SetDataType[], setIndex: number, setDataPatch: SetDataPatch) {
  const setData = { ...setDataPatch };

  if (setData.weight !== undefined && !Number.isFinite(setData.weight)) setData.weight = undefined;
  if (setData.reps !== undefined && !Number.isFinite(setData.reps)) setData.reps = undefined;

  sets[setIndex] = {
    ...sets[setIndex],
    ...setData
  };
  if (setData.done === true && sets[setIndex].weight === undefined) {
    sets[setIndex].weight = sets[setIndex - 1]?.weight ?? 0;
  }
  if (setData.done === true && sets[setIndex].reps === undefined) {
    sets[setIndex].reps = sets[setIndex - 1]?.reps ?? 0;
  }
}