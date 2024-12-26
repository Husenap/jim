"use client";

import { api } from "@/convex/_generated/api";
import { Link, Skeleton, User } from "@nextui-org/react";
import { useQuery } from "convex/react";

export default function Page() {
  return (
    <div>
      <UserData />
    </div>
  );
}

function UserData() {
  const user = useQuery(api.users.current);

  if (!user) return <UserDataSkeleton />;

  return (
    <User
      avatarProps={{
        src: user.imageURL,
        className: "w-20 h-20",
      }}
      name={user.name}
      description=<Link href={`/profile/u/${user.username}`} size="sm">
        @{user.username}
      </Link>
    />
  );
}

function UserDataSkeleton() {
  return (
    <div className="inline-flex items-center gap-2">
      <div>
        <Skeleton className="flex h-20 w-20 rounded-full" />
      </div>
      <div className="flex w-full flex-col gap-2">
        <Skeleton className="h-3 w-20 rounded-lg" />
        <Skeleton className="h-3 w-16 rounded-lg" />
      </div>
    </div>
  );
}
