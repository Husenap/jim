"use server";

import { createClient } from "@/utils/supabase/server";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export async function signInWithGithubAction() {
  const supabase = await createClient();
  const origin = (await headers()).get("origin");

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "github",
    options: {
      redirectTo: `${origin}/auth/callback`,
    }
  });

  if (error) {
    console.error(error.code + " " + error.message);
  }

  if (data.url) {
    redirect(data.url);
  }
}

export async function signOutAction() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  return redirect("/");
}
