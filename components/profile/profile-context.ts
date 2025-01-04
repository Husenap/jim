import { UseProfileReturn } from "@/components/profile/use-profile";
import { createContext } from "@nextui-org/react-utils";

export const [ProfileProvider, useProfileContext] = createContext<UseProfileReturn>({
  name: "ProfileContext",
  strict: true,
  errorMessage: "useProfileContext: `context` is undefined. Seems like you forgot to wrap component within <Profile>",
});