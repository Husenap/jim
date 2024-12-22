import { createClient } from "@/utils/supabase/server";
import SignOutButton from "@/components/auth/sign-out-button";
import SignInButton from "@/components/auth/sign-in-button";

export default async function AuthButton() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  return user ? (
    <div className="flex items-center gap-4">
      {user.user_metadata.name}!
      <img src={user.user_metadata.avatar_url} width={30} alt="" />
      <SignOutButton />
    </div>
  ) : (
    <SignInButton />
  );
}
