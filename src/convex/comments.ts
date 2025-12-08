import { mutation } from "@/convex/functions";
import { sendNotification } from "@/convex/notifications";
import { getCurrentUserOrThrow } from "@/convex/users";
import { v } from "convex/values";

export const addComment = mutation({
  args: {
    text: v.string(),
    workoutId: v.id("workouts"),
  },
  handler: async (ctx, { text, workoutId }) => {
    const user = await getCurrentUserOrThrow(ctx);
    const workout = await ctx.table("workouts").getX(workoutId);
    await ctx.table("comments").insert({
      text: text.trim(),
      workoutId,
      authorId: user._id,
    });
    if (workout.userId !== user._id) {
      const owner = await workout.edge("user");
      await sendNotification(
        ctx,
        owner.pushSubscriptions.map((s) => ({ ...s, userId: owner._id })),
        {
          title: `${user.name} commented on your workout!`,
          body: text,
          icon: user.imageURL,
          path: `/post/${workout._id}`,
        },
      );
    }
  },
});
