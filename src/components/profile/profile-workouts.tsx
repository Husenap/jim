import { useProfileContext } from "@/components/profile/profile-context";
import { TypographyH2 } from "@/components/typography";
import WorkoutFeed from "@/components/workout/workout-feed";

export default function ProfileWorkouts() {
  const { profileUser, workouts } = useProfileContext();

  return (
    <>
      <TypographyH2>Workouts</TypographyH2>
      <div className="-mx-2">
        <WorkoutFeed userId={profileUser?._id} />
      </div>
    </>
  );
}
