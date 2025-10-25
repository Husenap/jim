import { ExerciseType, SetDataType } from "@/convex/schema";

export function isBodyweightExercise(exerciseType: ExerciseType) {
  return new Set<ExerciseType>([
    "assisted bodyweight",
    "bodyweight reps",
    "weighted bodyweight",
  ]).has(exerciseType);
}

export function setDetailString(data: SetDataType) {
  if (data.weight) {
    return `${data.weight}kg x ${data.reps}`;
  }
  return `${data.reps}`;
}