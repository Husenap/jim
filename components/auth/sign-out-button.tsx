import { signOutAction } from "@/components/auth/actions";

export default function SignOutButton() {
  return (
    <button className="btn btn-primary" onClick={signOutAction}>Sign out</button>
  );
}