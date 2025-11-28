import { mutation, query } from "@/convex/functions";
import { getCurrentUserOrThrow } from "@/convex/users";
import { v } from "convex/values";

export const create = mutation({
  args: {
    startTime: v.number(),
    endTime: v.number(),
  },
  handler: async (ctx, { startTime, endTime }) => {
    const user = await getCurrentUserOrThrow(ctx);
    await ctx.table("sickLeaves").insert({
      startTime,
      endTime,
      userId: user._id,
    });
  },
});

export const remove = mutation({
  args: {
    id: v.id("sickLeaves"),
  },
  handler: async (ctx, { id }) => {
    const user = await getCurrentUserOrThrow(ctx);
    const sickLeave = await ctx.table("sickLeaves").getX(id);
    if (sickLeave.userId === user._id) {
      await sickLeave.delete();
    }
  },
});

export const get = query({
  args: {},
  handler: async (ctx) => {
    const user = await getCurrentUserOrThrow(ctx);
    const data = await user
      .edgeX("sickLeaves")
      .map(async ({ _id, startTime, endTime }) => ({
        id: _id,
        startTime,
        endTime,
      }));
    return data;
  },
});
