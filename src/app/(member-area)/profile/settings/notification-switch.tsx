"use client";

import { useServiceWorkerContext } from "@/components/service-worker/service-worker-context";
import { Switch } from "@heroui/react";
import { useState } from "react";

export default function NotificationSwitch() {
  const { isSupported, subscription, subscribe, unsubscribe } =
    useServiceWorkerContext();

  const [isPending, setIsPending] = useState(false);

  const subscriptionHandler = async (enabled: boolean) => {
    try {
      if (enabled) {
        setIsPending(true);
        await subscribe();
      } else {
        setIsPending(true);
        await unsubscribe();
      }
    } finally {
      setIsPending(false);
    }
  };

  return (
    <>
      <Switch
        isDisabled={isSupported !== true || isPending}
        isSelected={subscription !== null}
        onValueChange={subscriptionHandler}
      >
        {subscription !== null ? "Disable" : "Enable"} Notifications
        {isPending && <>...</>}
      </Switch>
    </>
  );
}
