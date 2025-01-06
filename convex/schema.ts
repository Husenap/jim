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
);
export type ExerciseType = Infer<typeof ExerciseTypeValidator>;

export const WeightedMuscleGroupValidator = v.object({
  muscleGroup: MuscleGroupValidator,
  weight: v.number(),
});
export type WeightedMuscleGroup = Infer<typeof WeightedMuscleGroupValidator>;

export const ExerciseFields = {
  name: v.string(),
  imageURL: v.optional(v.string()),
  equipment: EquipmentValidator,
  muscleGroups: v.array(WeightedMuscleGroupValidator),
  exerciseType: ExerciseTypeValidator,
  bodyweightFactor: v.optional(v.number()),
};
export const ExerciseFieldsValidator = v.object(ExerciseFields);
export type ExerciseFieldsType = Infer<typeof ExerciseFieldsValidator>;

export const SetTypeValidator = v.union(
  v.literal("normal"),
  v.literal("warmup"),
  v.literal("failure"),
  v.literal("drop")
);
export type SetType = Infer<typeof SetTypeValidator>;

export const SetDataValidator = v.object({
  type: SetTypeValidator,
  reps: v.optional(v.number()),
  weight: v.optional(v.number()),
  done: v.boolean(),
});
export type SetDataType = Infer<typeof SetDataValidator>;

export const ExerciseSetValidator = v.object({
  exercise: v.id("immutableExercises"),
  note: v.optional(v.string()),
  sets: v.array(SetDataValidator)
});
export type ExerciseSetType = Infer<typeof ExerciseSetValidator>;

const schema = defineEntSchema({
  migrations: defineEntFromTable(migrationsTable),

  users: defineEnt({
    username: v.string(),
    name: v.string(),
    imageURL: v.optional(v.string()),
    externalId: v.string(),
    bio: v.optional(v.string()),
    link: v.optional(v.string()),
    bodyweight: v.optional(v.number())
  })
    .index("externalId", ["externalId"])
    .index("username", ["username"])
    .searchIndex("search_username", { searchField: "username" })
    .edges("followers", { to: "users", inverse: "followees" })
    .edges("exercises", { ref: "ownerId" })
    .edges("routines", { ref: "ownerId" })
    .edges("workouts", { ref: true })
    .edges("likedWorkouts", { to: "workouts", field: "likedWorkoutsId", table: "users_to_workouts_likers" })
    .edge("activeWorkout", { ref: true }),

  routines: defineEnt({
    name: v.string(),
    exercises: v.array(v.id("exercises")),
  })
    .edge("user", { to: "users", field: "ownerId" }),

  exercises: defineEnt(ExerciseFields)
    .edge("user", { to: "users", field: "ownerId", optional: true }),

  immutableExercises: defineEnt({
    exercise: ExerciseFieldsValidator,
    refCount: v.number(),
  })
    .index("exercise", ["exercise"]),

  workouts: defineEnt({
    title: v.string(),
    description: v.optional(v.string()),
    exercises: v.array(ExerciseSetValidator),
    bodyweight: v.optional(v.number()),
    startTime: v.optional(v.number()),
  })
    .edge("user")
    .edges("likers", { to: "users", field: "likersId", table: "users_to_workouts_likers" }),

  activeWorkouts: defineEnt({
    title: v.string(),
    exercises: v.array(ExerciseSetValidator),
    bodyweight: v.optional(v.number())
  })
    .edge("user"),
});

export default schema;

export const entDefinitions = getEntDefinitions(schema);