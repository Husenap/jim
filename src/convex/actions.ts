"use node";

import { internal } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { internalAction } from "@/convex/_generated/server";
import type { PushSubscription } from "@/convex/types";
import { v, Validator } from "convex/values";
import webpush, { WebPushError } from "web-push";

export const sendNotification = internalAction({
  args: {
    subscriptions: v.array(
      v.any() as Validator<PushSubscription & { userId: Id<"users"> }>,
    ),
    payload: v.string(),
  },
  handler: async (ctx, { subscriptions, payload }) => {
    for (const subscription of subscriptions) {
      try {
        await webpush.sendNotification(subscription, payload, {
          vapidDetails: {
            subject: "mailto:jim@husseintaher.com",
            privateKey: process.env.VAPID_PRIVATE_KEY!,
            publicKey: process.env.VAPID_PUBLIC_KEY!,
          },
        });
      } catch (e) {
        if (e instanceof WebPushError && e.statusCode === 410) {
          ctx.runMutation(
            internal.pushNotifications.removeInvalidSubscription,
            {
              subscription,
              userId: subscription.userId,
            },
          );
        }
      }
    }
  },
});
