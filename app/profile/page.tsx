"use server";

import { createClient } from "@/utils/supabase/server";



export default async function Page() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  return (
    <span>Hello, {user?.user_metadata.name}</span>
  );
}