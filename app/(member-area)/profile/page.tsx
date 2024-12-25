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
    <div className="max-w-[150px] w-full flex items-center gap-2">
      <div>
        <Skeleton className="flex rounded-full w-10 h-10" />
      </div>
      <div className="w-full flex flex-col gap-2">
        <Skeleton className="h-3 w-4/5 rounded-lg" />
        <Skeleton className="h-3 w-3/5 rounded-lg" />
      </div>
    </div>
  );
}
async function UserData() {
  const token = await getAuthToken();
  const user = await fetchQuery(api.users.current, {}, { token });

  return (
    <User
      avatarProps={{
        src: user.image_url
      }}
      name={user.name}
      description=<Link href={`/profile/${user.username}`} size="sm">
        @{user.username}
      </Link>
    />
  );
}