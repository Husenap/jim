import { query } from "@/convex/functions";
import { getCurrentUserOrThrow } from "@/convex/users";

export const bodyweight = query({
  args: {},
  handler: async (ctx, {}) => {
    const user = await getCurrentUserOrThrow(ctx);
    const data = await user.edgeX("workouts").map((w) => ({
      date: w.startTime,
      bodyweight: w.bodyweight,
    }));
    return data;
  },
});

export const setsPerMuscle = query({
  args: {},
  handler: async (ctx, {}) => {
    const user = await getCurrentUserOrThrow(ctx);
    const data = await user.edgeX("workouts").map(async (w) => ({
      date: w.startTime,
      exercises: await Promise.all(
        w.exercises.map(async (e) => ({
          muscleGroups: (await ctx.table("immutableExercises").getX(e.exercise))
            .exercise.muscleGroups,
          numSets: e.sets.length,
        })),
      ),
    }));
    return data;
  },
});
