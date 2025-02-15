"use client";

import { ServiceWorkerProvider } from "@/components/service-worker/service-worker-context";
import { useServiceWorker } from "@/components/service-worker/use-service-worker";

export default function ServiceWorker({
  children,
}: {
  children: React.ReactNode;
}) {
  const context = useServiceWorker();
  return (
    <>
      <ServiceWorkerProvider value={context}>{children}</ServiceWorkerProvider>
    </>
  );
}
