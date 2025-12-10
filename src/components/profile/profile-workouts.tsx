import FullscreenSpinner from "@/components/fullscreen-spinner";
import { useProfileContext } from "@/components/profile/profile-context";
import { TypographyH2 } from "@/components/typography";
import WorkoutFeed from "@/components/workout/workout-feed";
import { Dumbbell } from "lucide-react";

export default function ProfileWorkouts() {
  const { profileUser, workouts } = useProfileContext();

  return (
    <>
      {workouts === undefined ? (
        <FullscreenSpinner />
      ) : (
        <>
          <TypographyH2>Workouts</TypographyH2>
          {workouts && workouts.length > 0 ? (
            <div className="-mx-2">
              <WorkoutFeed userId={profileUser?._id} />
            </div>
          ) : (
            <div className="flex flex-col items-center gap-2 py-8">
              <Dumbbell size={32} />
              <span className="text-center">No workouts yet.</span>
            </div>
          )}
        </>
      )}
    </>
  );
}
