import { signInWithGithubAction, signOutAction } from "@/app/actions";
import { Button } from "./ui/button";
import { createClient } from "@/utils/supabase/server";

export default async function AuthButton() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  return user ? (
    <div className="flex items-center gap-4">
      Hey, {user.user_metadata.name}!
      <img src={user.user_metadata.avatar_url} width={30} alt="" />
      <form action={signOutAction}>
        <Button type="submit" variant={"outline"}>
          Sign out
        </Button>
      </form>
    </div>
  ) : (
    <div className="flex gap-2">
      <Button size="sm" variant={"outline"} onClick={signInWithGithubAction}>
        Sign in
      </Button>
    </div>
  );
}
