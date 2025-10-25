import DrawerMenu from "@/components/drawer-menu/drawer-menu";
import DrawerMenuContent from "@/components/drawer-menu/drawer-menu-content";
import DrawerMenuTrigger from "@/components/drawer-menu/drawer-menu-trigger";
import FullscreenSpinner from "@/components/fullscreen-spinner";
import { usePostContext } from "@/components/post/post-context";
import { TypographyH2 } from "@/components/typography";
import WorkoutButtons from "@/components/workout/workout-buttons";
import WorkoutCommentsDrawer from "@/components/workout/workout-comments-drawer";
import WorkoutCommentsPreview from "@/components/workout/workout-comments-preview";
import WorkoutLikesAndComments from "@/components/workout/workout-likes-and-comments";
import WorkoutStats from "@/components/workout/workout-stats";
import WorkoutTitleDescription from "@/components/workout/workout-title-description";
import WorkoutUser from "@/components/workout/workout-user";
import { api } from "@/convex/_generated/api";
import {
  Avatar,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Divider,
  MenuItem,
} from "@heroui/react";
import { useMutation } from "convex/react";
import { Ellipsis, X } from "lucide-react";
import { useTransitionRouter } from "next-view-transitions";

export default function WorkoutPost() {
  const { workout, user, currentUser } = usePostContext();

  if (!workout || !user) return <FullscreenSpinner></FullscreenSpinner>;

  const removeWorkout = useMutation(api.workouts.remove).withOptimisticUpdate(
    (localStore, { workoutId }) => {
      if (!currentUser) return;
      for (const query of localStore.getAllQueries(
        api.workouts.paginatedWorkouts,
      )) {
        if (query.value) {
          query.value.page = query.value.page.filter(
            (r) => r.workout._id !== workoutId,
          );
          localStore.setQuery(
            api.workouts.paginatedWorkouts,
            query.args,
            query.value,
          );
        }
      }
    },
  );

  const { push } = useTransitionRouter();

  return (
    <Card radius="none">
      <CardHeader className="flex flex-col items-start gap-2">
        <div className="flex w-full flex-row">
          <WorkoutUser />
          {workout.userId === currentUser?._id && (
            <DrawerMenu>
              <DrawerMenuTrigger>
                <Button isIconOnly variant="light" size="md">
                  <Ellipsis size={20} />
                </Button>
              </DrawerMenuTrigger>
              <DrawerMenuContent ariaLabel="Workout Menu">
                <MenuItem
                  startContent={<X />}
                  key="delete"
                  color="danger"
                  className="text-danger"
                  title="Remove workout"
                  onPress={() => {
                    removeWorkout({ workoutId: workout._id });
                  }}
                />
              </DrawerMenuContent>
            </DrawerMenu>
          )}
        </div>
        <WorkoutTitleDescription />
        <WorkoutStats />
      </CardHeader>
      <Divider />
      <CardBody
        className="flex cursor-pointer flex-col gap-2"
        onClick={() => push(`/post/${workout._id}`)}
      >
        <TypographyH2>Workout</TypographyH2>
        {workout.exercises.slice(0, 3).map((w, i) => (
          <div key={i} className="flex flex-row items-center gap-2">
            <Avatar src={w.exercise.imageURL} size="md" />
            {w.sets.length} sets of {w.exercise.name}
          </div>
        ))}
        {workout.exercises.length > 3 && (
          <div className="text-default-400 text-center text-sm">
            See {workout.exercises.length - 3} more exercises
          </div>
        )}
      </CardBody>
      <CardBody>
        <WorkoutLikesAndComments />
      </CardBody>
      <Divider />
      <CardFooter>
        <WorkoutButtons />
      </CardFooter>
      <WorkoutCommentsPreview />
      <WorkoutCommentsDrawer />
    </Card>
  );
}
