import { internalMutation, mutation } from "@/convex/functions";
import { PushSubscription } from "@/convex/types";
import { getCurrentUserOrThrow } from "@/convex/users";
import { v, Validator } from "convex/values";

export const subscribe = mutation({
  args: {
    subscription: v.any() as Validator<PushSubscription>,
  },
  handler: async (ctx, { subscription }) => {
    const u = await getCurrentUserOrThrow(ctx);
    const user = await ctx.table("users").getX(u._id);
    user.pushSubscriptions.push(subscription);
    await user.patch(user);
  },
});

export const unsubscribe = mutation({
  args: {
    subscription: v.any() as Validator<PushSubscription>,
  },
  handler: async (ctx, { subscription }) => {
    const u = await getCurrentUserOrThrow(ctx);
    const user = await ctx.table("users").getX(u._id);
    user.pushSubscriptions = user.pushSubscriptions.filter(
      (s) =>
        s.endpoint !== subscription.endpoint ||
        s.expirationTime !== subscription.expirationTime ||
        s.keys.auth !== subscription.keys.auth ||
        s.keys.p256dh !== subscription.keys.p256dh,
    );
    await user.patch(user);
  },
});

export const removeInvalidSubscription = internalMutation({
  args: {
    subscription: v.any() as Validator<PushSubscription>,
    userId: v.id("users"),
  },
  handler: async (ctx, { subscription, userId }) => {
    const user = await ctx.table("users").getX(userId);
    user.pushSubscriptions = user.pushSubscriptions.filter(
      (s) =>
        s.endpoint !== subscription.endpoint ||
        s.expirationTime !== subscription.expirationTime ||
        s.keys.auth !== subscription.keys.auth ||
        s.keys.p256dh !== subscription.keys.p256dh,
    );
    await user.patch(user);
  },
});
