import { internalMutation } from "@/convex/_generated/server"
import { makeMigration } from "convex-helpers/server/migrations"

const migration = makeMigration(internalMutation, {
  migrationTable: "migrations"
});

export const addWeightedMuscleGroups = migration({
  table: "exercises",
  migrateOne: async (_, exercise) => ({
    ...exercise,
    muscleGroups: [
      { muscleGroup: exercise.primaryMuscleGroup, weight: 1.0 },
      ...exercise.secondaryMuscleGroups.map(mg => ({ muscleGroup: mg, weight: 0.5 }))
    ],
  }),
});

