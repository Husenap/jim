import { mutation, query } from "@/convex/functions";
import { getCurrentUser } from "@/convex/users";
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