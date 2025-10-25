'use node';

import { internalAction } from "@/convex/_generated/server";
import type { PushSubscription } from "@/convex/types";
import { v, Validator } from "convex/values";
import webpush from 'web-push';



export const sendNotification = internalAction({
  args: {
    subscriptions: v.array(v.any() as Validator<PushSubscription>),
    payload: v.string()
  },
  handler: async (ctx, { subscriptions, payload }) => {
    try {
      for (const subscription of subscriptions) {
        await webpush.sendNotification(subscription, payload, {
          vapidDetails: {
            subject: "mailto:jim@husseintaher.com",
            privateKey: process.env.VAPID_PRIVATE_KEY!,
            publicKey: process.env.VAPID_PUBLIC_KEY!,
          }
        });
      }
    } catch (e) {
      console.log(e);
    }
  }
});