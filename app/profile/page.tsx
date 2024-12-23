"use server";

import { api } from "@/convex/_generated/api";
import { getAuthToken } from "@/utils/auth";
import { Link, User } from "@nextui-org/react";
import { fetchQuery } from "convex/nextjs";
import { redirect } from "next/navigation";


export default async function Page() {
  const token = await getAuthToken();
  if (!token) return redirect("/");

  const user = await fetchQuery(api.users.current, {}, { token });
  if (!user) return redirect("/");

  return (
    <div>
      <User
        avatarProps={{
          src: user.image_url
        }}
        name={user.name}
        description=<Link href={`/profile/${user.username}`} size="sm">
          @{user.username}
        </Link> />
    </div>
  );
}