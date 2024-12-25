"use server";

import { api } from "@/convex/_generated/api";
import { getAuthToken } from "@/utils/auth";
import { Link, Skeleton, User } from "@nextui-org/react";
import { fetchQuery } from "convex/nextjs";
import { Suspense } from "react";

export default async function Page() {
  return (
    <div>
      <h1>Profile Page</h1>
      <Suspense fallback={<UserDataSkeleton />}>
        <UserData />
      </Suspense>
    </div>
  );
}

async function UserDataSkeleton() {
  return (
    <div className="flex w-full max-w-[150px] items-center gap-2">
      <div>
        <Skeleton className="flex h-10 w-10 rounded-full" />
      </div>
      <div className="flex w-full flex-col gap-2">
        <Skeleton className="h-3 w-4/5 rounded-lg" />
        <Skeleton className="h-3 w-3/5 rounded-lg" />
      </div>
    </div>
  );
}
async function UserData() {
  const token = await getAuthToken();
  if (!token) return <h1>Failed to load user page!</h1>;
  const user = await fetchQuery(api.users.current, {}, { token });
  if (!user) return <h1>Failed to load user page!</h1>;

  return (
    <User
      avatarProps={{
        src: user.image_url,
      }}
      name={user.name}
      description=<Link href={`/profile/${user.username}`} size="sm">
        @{user.username}
      </Link>
    />
  );
}
