
import { UseServiceWorkerReturn } from "@/components/service-worker/use-service-worker";
import { createContext } from "@heroui/react-utils";

export const [ServiceWorkerProvider, useServiceWorkerContext] = createContext<UseServiceWorkerReturn>({
  name: "ServiceWorker",
  strict: true,
  errorMessage: "useServiceWorkerContext: `context` is undefined. Seems like you forgot to wrap component within <ServiceWorker>",
});