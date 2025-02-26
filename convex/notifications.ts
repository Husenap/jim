import { internal } from "@/convex/_generated/api";
import type { PushSubscription } from "@/convex/types";
import { MutationCtx } from "@/convex/types";

export async function sendNotification(
  ctx: MutationCtx,
  subscriptions: PushSubscription[],
  payload: {
    title: string,
    body?: string,
    icon?: string,
    path?: string,
  },
  delayMs?: number,
) {
  if (subscriptions.length <= 0) return;

  return await ctx.scheduler.runAfter(delayMs ?? 0, internal.actions.sendNotification, {
    subscriptions,
    payload: JSON.stringify(payload)
  });
}