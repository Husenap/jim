import { mutation } from "@/convex/functions";
import { getCurrentUserOrThrow } from "@/convex/users";
import { v } from "convex/values";

export const addComment = mutation({
  args: {
    text: v.string(),
    workoutId: v.id("workouts"),
  },
  handler: async (ctx, { text, workoutId }) => {
    const user = await getCurrentUserOrThrow(ctx);
    await ctx.table("comments").insert({
      text: text.trim(),
      workoutId,
      authorId: user._id
    });
  }
});