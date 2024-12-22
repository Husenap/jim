import { signOutAction } from "@/components/auth/actions";
import { Button } from "@nextui-org/react";

export default function SignOutButton() {
  return (
    <Button color="danger" onPress={signOutAction}>Sign out</Button>
  );
}