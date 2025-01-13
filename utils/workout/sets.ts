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