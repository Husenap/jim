import { defineEnt, defineEntFromTable, defineEntSchema, getEntDefinitions } from "convex-ents";

import { migrationsTable } from "convex-helpers/server/migrations";
import { Infer, v } from "convex/values";

export const EquipmentValidator = v.union(
  v.literal("none"),
  v.literal("barbell"),
  v.literal("cable"),
  v.literal("dumbbell"),
  v.literal("high bar"),
  v.literal("kettlebell"),
  v.literal("machine"),
  v.literal("plate"),
  v.literal("resistance band"),
  v.literal("suspension band"),
  v.literal("other"),
);
export type Equipment = Infer<typeof EquipmentValidator>;

export const MuscleGroupValidator = v.union(
  v.literal("abdominals"),
  v.literal("abductors"),
  v.literal("adductors"),
  v.literal("biceps"),
  v.literal("calves"),
  v.literal("cardio"),
  v.literal("chest"),
  v.literal("forearms"),
  v.literal("fullbody"),
  v.literal("glutes"),
  v.literal("hamstrings"),
  v.literal("lats"),
  v.literal("lower back"),
  v.literal("neck"),
  v.literal("quadriceps"),
  v.literal("shoulders"),
  v.literal("traps"),
  v.literal("triceps"),
  v.literal("upper back"),
  v.literal("other"),
);
export type MuscleGroup = Infer<typeof MuscleGroupValidator>;

export const ExerciseTypeValidator = v.union(
  v.literal("weight & reps"),
  v.literal("bodyweight reps"),
  v.literal("weighted bodyweight"),
  v.literal("assisted bodyweight"),
  v.literal("duration"),
  v.literal("duration & weight"),
  v.literal("duration & distance"),
  v.literal("weight & distance"),
);
export type ExerciseType = Infer<typeof ExerciseTypeValidator>;

export const WeightedMuscleGroupValidator = v.object({
  muscleGroup: MuscleGroupValidator,
  weight: v.number(),
});
export type WeightedMuscleGroup = Infer<typeof WeightedMuscleGroupValidator>;

const exerciseFields = {
  name: v.string(),
  imageURL: v.optional(v.string()),
  equipment: EquipmentValidator,
  primaryMuscleGroup: v.optional(MuscleGroupValidator),
  secondaryMuscleGroups: v.optional(v.array(MuscleGroupValidator)),
  muscleGroups: v.array(WeightedMuscleGroupValidator),
  exerciseType: ExerciseTypeValidator,
};

const schema = defineEntSchema({
  users: defineEnt({
    username: v.string(),
    name: v.string(),
    imageURL: v.optional(v.string()),
    externalId: v.string(),
    bio: v.optional(v.string()),
    link: v.optional(v.string()),
  })
    .index("externalId", ["externalId"])
    .index("username", ["username"])
    .edges("exercises", { ref: "ownerId" })
    .edges("routines", { ref: "ownerId" }),

  exercises: defineEnt({
    ...exerciseFields
  })
    .edge("user", { to: "users", field: "ownerId", optional: true }),

  routines: defineEnt({
    name: v.string(),
    exercises: v.array(v.id("exercises")),
  })
    .edge("user", { to: "users", field: "ownerId" }),

  migrations: defineEntFromTable(migrationsTable),
});

export default schema;

export const entDefinitions = getEntDefinitions(schema);