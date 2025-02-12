"use server";

import { api } from "@/convex/_generated/api";
import { Link, User as NextUIUser } from "@heroui/react";
import { fetchQuery } from "convex/nextjs";

export default async function User({ username }: { username: string }) {
  const user = await fetchQuery(api.users.byUsername, { username });

  if (!user) return <NextUIUser name="Unknown" />;

  return (
    <NextUIUser
      avatarProps={{
        src: user.imageURL,
      }}
      name={user.name}
      description=<Link href={`/user/${user.username}`} size="sm">
        @{user.username}
      </Link>
    />
  );
}
