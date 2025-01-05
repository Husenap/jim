import { Doc } from "@/convex/_generated/dataModel";
import { mutation, query } from "@/convex/functions";
import { getCurrentUser, getCurrentUserOrThrow } from "@/convex/users";
import { paginationOptsValidator, PaginationResult } from "convex/server";
import { v } from "convex/values";

export const get = query({
  args: { userId: v.optional(v.id("users")) },
  handler: async (ctx, { userId }) => {
    if (!userId) return [];
    const user = await ctx.table("users").get(userId);
    if (!user) return [];
    const workouts = await user.edge("workouts").order("desc").docs();
    return workouts;
  }
});

export const create = mutation({
  args: {
    activeWorkoutId: v.id("activeWorkouts"),
    title: v.string(),
    description: v.optional(v.string())
  },
  handler: async (ctx, { activeWorkoutId, title, description }) => {
    const user = await getCurrentUser(ctx);
    const activeWorkout = await ctx.table("activeWorkouts").getX(activeWorkoutId);
    if (user?._id !== activeWorkout.userId) throw new Error("You're not the owner of the active workout!");

    await ctx.table("workouts").insert({
      title,
      description,
      exercises: activeWorkout.exercises,
      userId: activeWorkout.userId,
      bodyweight: activeWorkout.bodyweight
    });
    await activeWorkout.delete();
  }
});

export const paginatedWorkouts = query({
  args: {
    userId: v.optional(v.id("users")),
    paginationOpts: paginationOptsValidator
  },
  handler: async (ctx, { userId, paginationOpts }) => {
    try {
      const user = await getCurrentUserOrThrow(ctx);

      let results;

      if (userId) {
        results = await ctx.table("users")
          .getX(userId)
          .edgeX("workouts")
          .order("desc")
          .paginate(paginationOpts);
      } else {
        const followees = await user.edgeX("followees").map(f => f._id);

        results =
          await ctx.table("workouts")
            .filter(q => q.or(
              ...followees.map(id => q.eq(q.field("userId"), id))
            ))
            .order("desc")
            .paginate(paginationOpts)
            .docs();
      }

      return {
        ...results,
        page: await Promise.all(results.page.map(async workout => ({
          workout,
          user: await ctx.table("users").getX(workout.userId).doc()
        })))
      };
    } catch (error) {
      return {
        page: [],
        isDone: false,
        continueCursor: ""
      } satisfies PaginationResult<{
        workout: Doc<"workouts">,
        user: Doc<"users">,
      }>;
    }
  }
});