import { defineSchema, defineTable } from "convex/server";
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

const schema = defineSchema({
  users: defineTable({
    username: v.string(),
    name: v.string(),
    imageURL: v.optional(v.string()),
    externalId: v.string(),
    bio: v.optional(v.string()),
    link: v.optional(v.string()),
  })
    .index("externalId", ["externalId"])
    .index("username", ["username"]),

  exercises: defineTable({
    name: v.string(),
    ownerId: v.optional(v.id("users")),
    imageURL: v.optional(v.string()),
    equipment: EquipmentValidator,
    primaryMuscleGroup: MuscleGroupValidator,
    secondaryMuscleGroups: v.array(MuscleGroupValidator),
    exerciseType: ExerciseTypeValidator,
  })
    .index("ownerId", ["ownerId"]),
});

export default schema;