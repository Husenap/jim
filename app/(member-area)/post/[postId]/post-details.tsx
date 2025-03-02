"use client";

import FullscreenSpinner from "@/components/fullscreen-spinner";
import { usePostContext } from "@/components/post/post-context";
import WorkoutButtons from "@/components/workout/workout-buttons";
import WorkoutExerciseDetails from "@/components/workout/workout-exercise-details";
import WorkoutLikesAndComments from "@/components/workout/workout-likes-and-comments";
import WorkoutMuscleSplit from "@/components/workout/workout-muscle-split";
import WorkoutStats from "@/components/workout/workout-stats";
import WorkoutTitleDescription from "@/components/workout/workout-title-description";
import WorkoutUser from "@/components/workout/workout-user";
import { Divider } from "@heroui/react";

export default function PostDetails() {
  const { workout, user } = usePostContext();

  if (workout === undefined || user === undefined) {
    return <FullscreenSpinner />;
  }

  if (!workout || !user) {
    return <span>Failed to get workout details!</span>;
  }

  return (
    <>
      <div className="flex w-full flex-row">
        <WorkoutUser />
      </div>
      <WorkoutTitleDescription />
      <WorkoutStats />
      <WorkoutLikesAndComments />
      <div className="-mx-2">
        <Divider />
      </div>
      <WorkoutButtons />
      <div className="-mx-2">
        <Divider />
      </div>
      <WorkoutMuscleSplit />
      <div>
        <WorkoutExerciseDetails />
      </div>
    </>
  );
}
