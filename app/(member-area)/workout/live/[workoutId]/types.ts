import { ExerciseSetType } from "@/convex/schema";

export type SetRowType = {
  set: ExerciseSetType["sets"][0];
  index: number;
};

export type SetRowColumnKey = keyof SetRowType["set"];