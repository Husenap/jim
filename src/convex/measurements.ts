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
