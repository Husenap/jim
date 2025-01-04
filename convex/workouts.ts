import { query } from "@/convex/functions";
import { getCurrentUser, userByUsername } from "@/convex/users";
import { v } from "convex/values";


export const current = query({
  args: {},
  handler: async (ctx) => {
    const user = await getCurrentUser(ctx);
    if (!user) return [];
    const workouts = await user.edge("workouts").docs();
    return workouts;
  }
});

export const byUsername = query({
  args: { username: v.string() },
  handler: async (ctx, { username }) => {
    const user = await userByUsername(ctx, username);
    if (!user) return [];
    const workouts = await user.edge("workouts").docs();
    return workouts;
  }
});