import { ExerciseFieldsType, SetDataType } from "@/convex/schema";

export default function calculateVolume(
  exercises?: {
    exercise: ExerciseFieldsType,
    sets: SetDataType[]
  }[],
  bodyweight?: number
): number {
  let volume = 0;

  if (!exercises) return volume;

  for (const { exercise, sets } of exercises) {

    const bw = (bodyweight ?? 0) * (exercise.bodyweightFactor ?? 1);

    for (const set of sets) {
      const w = set.weight ?? 0;
      const reps = set.reps ?? 0;

      if (set.done) {
        switch (exercise.exerciseType) {
          case "weight & reps":
            volume += reps * w;
            break;
          case "bodyweight reps":
            volume += reps * bw;
            break;
          case "weighted bodyweight":
            volume += reps * (bw + w);
            break;
          case "assisted bodyweight":
            volume += Math.max(0, reps * (bw - w));
            break;
        }
      }
    }
  }

  return Math.round(volume * 100) / 100;
}

