"use client";

import { useServiceWorkerContext } from "@/components/service-worker/service-worker-context";
import { Switch } from "@heroui/react";

export default function NotificationSwitch() {
  const { isSupported, subscription, subscribe, unsubscribe } =
    useServiceWorkerContext();

  const subscriptionHandler = (enabled: boolean) => {
    if (enabled) {
      subscribe();
    } else {
      unsubscribe();
    }
  };

  return (
    <>
      <Switch
        isDisabled={!isSupported}
        isSelected={subscription !== null}
        onValueChange={subscriptionHandler}
      >
        Enable Notifications
      </Switch>
    </>
  );
}
