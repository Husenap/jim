import { mutation, query } from "@/convex/_generated/server";
import { getCurrentUser, getCurrentUserOrThrow } from "@/convex/users";
import { getManyFrom } from "convex-helpers/server/relationships";
import { v } from "convex/values";

export const custom = query({
  args: {},
  handler: async (ctx) => {
    const user = await getCurrentUser(ctx);
    if (!user) return [];
    const routines = await getManyFrom(ctx.db, "routines", "ownerId", user._id);
    const routinesWithExercises = await Promise.all(routines.map(async (r) => {
      const exercises = await Promise.all(r.exercises.map(ctx.db.get));
      return { ...r, exercises };
    }))
    return routinesWithExercises;
  }
});

export const create = mutation({
  args: {
    name: v.string(),
    exercises: v.array(v.id("exercises"))
  },
  handler: async (ctx, { name, exercises }) => {
    const user = await getCurrentUserOrThrow(ctx);
    return await ctx.db.insert("routines", {
      name,
      exercises,
      ownerId: user._id,
    });
  }
});