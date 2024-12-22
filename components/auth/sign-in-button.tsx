import { signInWithGithubAction } from "@/components/auth/actions";

export default function SignInButton() {
  return (
    <button className="btn btn-primary" onClick={signInWithGithubAction}>Sign in</button>
  );
}