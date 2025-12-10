"use client";

import { usePostContext } from "@/components/post/post-context";
import { humanReadableTimeDiff } from "@/utils/time-diff";
import { User } from "@heroui/react";
import Link from "next/link";

export default function WorkoutUser() {
  const { user, workout } = usePostContext();

  if (!user || !workout) return <></>;

  return (
    <User
      className="flex-1 justify-start"
      as={Link}
      href={`/user/${user.username}`}
      avatarProps={{ src: user.imageURL }}
      name={user.name}
      description={humanReadableTimeDiff({
        startTime: workout.startTime,
      })}
    />
  );
}
