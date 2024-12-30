import { mutation, query } from "@/convex/functions";
import { getCurrentUser, getCurrentUserOrThrow } from "@/convex/users";
import { v } from "convex/values";

export const custom = query({
  args: {},
  handler: async (ctx) => {
    const user = await getCurrentUser(ctx);
    if (!user) return [];

    return await ctx.table("routines", "ownerId", q => q.eq("ownerId", user._id))
      .map(async (routine) => ({
        ...routine,
        exercises: await ctx.table("exercises").getMany(routine.exercises)
      }));
  }
});

export const create = mutation({
  args: {
    name: v.string(),
    exercises: v.array(v.id("exercises"))
  },
  handler: async (ctx, { name, exercises }) => {
    const user = await getCurrentUserOrThrow(ctx);
    return await ctx.table("routines").insert({
      name,
      exercises,
      ownerId: user._id,
    });
  }
});