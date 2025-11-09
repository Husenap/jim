import { mutation, query } from "@/convex/functions";
import { getCurrentUser, getCurrentUserOrThrow } from "@/convex/users";
import { v } from "convex/values";

export const custom = query({
  args: {},
  handler: async (ctx) => {
    const user = await getCurrentUser(ctx);
    if (!user) return [];

    return user.edge("routines").map(async (routine) => ({
      ...routine,
      exercises: (
        await ctx.table("exercises").getMany(routine.exercises)
      ).filter((e) => e !== null),
    }));
  },
});

export const create = mutation({
  args: {
    name: v.string(),
    exercises: v.array(v.id("exercises")),
  },
  handler: async (ctx, { name, exercises }) => {
    const user = await getCurrentUserOrThrow(ctx);
    return await ctx.table("routines").insert({
      name,
      exercises,
      ownerId: user._id,
    });
  },
});

export const remove = mutation({
  args: {
    id: v.id("routines"),
  },
  handler: async (ctx, { id }) => {
    const user = await getCurrentUserOrThrow(ctx);
    const routine = await ctx.table("routines").getX(id);
    if (routine.ownerId === user._id) {
      await routine.delete();
    }
  },
});

export const get = query({
  args: {
    routineId: v.id("routines"),
  },
  handler: async (ctx, { routineId }) => {
    const user = await getCurrentUserOrThrow(ctx);
    const routine = await ctx.table("routines").getX(routineId);
    if (routine.ownerId !== user._id) {
      throw new Error("You're not the owner of this routine!");
    }
    return {
      ...routine,
      exercises: (
        await ctx.table("exercises").getMany(routine.exercises)
      ).filter((e) => e !== null),
    };
  },
});
