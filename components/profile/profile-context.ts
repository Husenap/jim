import { UseProfileReturn } from "@/components/profile/use-profile";
import { createContext } from "@heroui/react-utils";

export const [ProfileProvider, useProfileContext] = createContext<UseProfileReturn>({
  name: "ProfileContext",
  strict: true,
  errorMessage: "useProfileContext: `context` is undefined. Seems like you forgot to wrap component within <Profile>",
});