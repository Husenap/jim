"use client";

import { PostProvider } from "@/components/post/post-context";
import { usePost } from "@/components/post/use-post";
import { Id } from "@/convex/_generated/dataModel";
import { WorkoutDetailsType } from "@/convex/workouts";
import React from "react";

export default function Post({
  children,
  workoutId,
  workoutDetails,
}: {
  children: React.ReactNode;
  workoutId?: Id<"workouts">;
  workoutDetails?: WorkoutDetailsType;
}) {
  const context = usePost({ workoutId, workoutDetails });
  return <PostProvider value={context}>{children}</PostProvider>;
}
