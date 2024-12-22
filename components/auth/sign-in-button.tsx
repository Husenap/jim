import { signInWithGithubAction } from "@/components/auth/actions";
import { Button } from "@nextui-org/react";


export default function SignInButton() {
  return (
    <Button color="primary" onPress={signInWithGithubAction}>Sign in</Button>
  );
}