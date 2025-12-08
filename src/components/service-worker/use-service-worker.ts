import { api } from "@/convex/_generated/api";
import { PushSubscription as PushSubscriptionType } from "@/convex/types";
import { useMutation } from "convex/react";
import { useCallback, useEffect, useMemo, useState } from "react";

function urlBase64ToUint8Array(base64String: string) {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/-/g, "+").replace(/_/g, "/");

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}

export function useServiceWorker() {
  const [isSupported, setIsSupported] = useState(false);
  const [subscription, setSubscription] = useState<PushSubscription | null>(
    null,
  );
  const subscribeUser = useMutation(api.pushNotifications.subscribe);
  const unsubscribeUser = useMutation(api.pushNotifications.unsubscribe);

  useEffect(() => {
    if ("serviceWorker" in navigator && "PushManager" in window) {
      navigator.serviceWorker.register("/sw.js");
      setIsSupported(true);
      getSubscription();
    }
  }, []);

  async function getSubscription() {
    const reg = await navigator.serviceWorker.getRegistration();
    if (reg) {
      const sub = await reg.pushManager.getSubscription();
      setSubscription(sub);
    }
  }

  const subscribe = useCallback(async () => {
    const registration = await navigator.serviceWorker.ready;
    const sub = await registration.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: urlBase64ToUint8Array(
        process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY!,
      ),
    });
    await subscribeUser({
      subscription: sub.toJSON() as PushSubscriptionType,
    });
    setSubscription(sub);
  }, [setSubscription]);

  const unsubscribe = useCallback(async () => {
    if (subscription) {
      await unsubscribeUser({
        subscription: subscription.toJSON() as PushSubscriptionType,
      });
      await subscription?.unsubscribe();
      setSubscription(null);
    }
  }, [subscription, setSubscription]);

  const context = useMemo(
    () => ({
      isSupported,
      subscription,
      subscribe,
      unsubscribe,
    }),
    [isSupported, subscription, subscribe, unsubscribe],
  );

  return context;
}

export type UseServiceWorkerReturn = ReturnType<typeof useServiceWorker>;
