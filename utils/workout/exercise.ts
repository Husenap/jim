import { ExerciseType } from "@/convex/schema";

export function isBodyweightExercise(exerciseType: ExerciseType) {
  return new Set<ExerciseType>([
    "assisted bodyweight",
    "bodyweight reps",
    "weighted bodyweight",
  ]).has(exerciseType);
}