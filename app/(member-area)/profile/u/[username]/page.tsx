"use server";

import { api } from "@/convex/_generated/api";
import { getAuthToken } from "@/utils/auth";
import { Link, User } from "@nextui-org/react";
import { fetchQuery } from "convex/nextjs";
import { redirect } from "next/navigation";

export default async function Page({
  params,
}: {
  params: Promise<{ username: string }>;
}) {
  const { username } = await params;

  const user = await fetchQuery(api.users.byUsername, { username });

  if (!user) {
    return <span>User @{username} doesn't exist!</span>;
  }

  const token = await getAuthToken();
  if (token) {
    const current_user = await fetchQuery(api.users.current, {}, { token });
    if (current_user && current_user._id == user._id) {
      return redirect("/profile");
    }
  }

  return (
    <div>
      <User
        avatarProps={{
          src: user.imageURL,
        }}
        name={user.name}
        description=<Link href={`/profile/u/${user.username}`} size="sm">
          @{user.username}
        </Link>
      />
    </div>
  );
}
