"use client";

import Live from "@/app/(member-area)/workout/live/[workoutId]/live";
import Navbar from "@/app/(member-area)/workout/live/[workoutId]/navbar";
import ActiveWorkout from "@/components/active-workout/active-workout";
import PageContainer from "@/components/page-container";
import { Id } from "@/convex/_generated/dataModel";
import { use } from "react";

export default function Page({
  params,
}: {
  params: Promise<{ workoutId: Id<"activeWorkouts"> }>;
}) {
  const { workoutId } = use(params);

  return (
    <ActiveWorkout workoutId={workoutId}>
      <PageContainer topNavbar={<Navbar />}>
        <Live />
      </PageContainer>
    </ActiveWorkout>
  );
}
