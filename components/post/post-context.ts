import { UsePostReturn } from "@/components/post/use-post";
import { createContext } from "@heroui/react-utils";

export const [PostProvider, usePostContext] = createContext<UsePostReturn>({
  name: "PostContext",
  strict: true,
  errorMessage: "usePostContext: `context` is undefined. Seems like you forgot to wrap component within <Post>",
});