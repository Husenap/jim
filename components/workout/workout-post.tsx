import {
  TypographyH1,
  TypographyH2,
  TypographyH4,
} from "@/components/typography";
import { api } from "@/convex/_generated/api";
import { Doc } from "@/convex/_generated/dataModel";
import { PaginatedWorkoutsReturnType } from "@/convex/workouts";
import {
  humanReadiableDuration,
  humanReadibleTimeDiff,
} from "@/utils/time-diff";
import countSets from "@/utils/workout/sets";
import calculateVolume from "@/utils/workout/volume";
import {
  Avatar,
  AvatarGroup,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Divider,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  User,
} from "@nextui-org/react";
import { useMutation, useQuery } from "convex/react";
import { Ellipsis, MessageCircle, Share, ThumbsUp } from "lucide-react";
import { Link } from "next-view-transitions";
import { useMemo } from "react";

export default function WorkoutPost({
  workout,
  user,
  onToggleLike,
}: {
  workout: PaginatedWorkoutsReturnType;
  user: Doc<"users">;
  onToggleLike?: () => void;
}) {
  const time = useMemo(
    () =>
      workout.startTime
        ? humanReadiableDuration({
            startTime: workout.startTime,
            endTime: workout._creationTime,
            includeSeconds: false,
          })
        : undefined,
    [workout],
  );
  const volume = useMemo(
    () => calculateVolume(workout.exercises, workout.bodyweight),
    [workout],
  );
  const sets = useMemo(() => countSets(workout.exercises), [workout]);

  const currentUser = useQuery(api.users.current);
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

  return (
    <Card radius="none">
      <CardHeader className="flex flex-col items-start gap-2">
        <div className="flex w-full flex-row justify-between">
          <User
            as={Link}
            href={`/user/${user.username}`}
            avatarProps={{ src: user.imageURL }}
            name={user.name}
            description={humanReadibleTimeDiff({
              startTime: workout._creationTime,
            })}
          />
          {workout.userId === currentUser?._id && (
            <Dropdown placement="left">
              <DropdownTrigger>
                <Button isIconOnly variant="light" size="md">
                  <Ellipsis size={20} />
                </Button>
              </DropdownTrigger>
              <DropdownMenu>
                <DropdownItem
                  key="delete"
                  color="danger"
                  className="text-danger"
                  onPress={() => {
                    removeWorkout({ workoutId: workout._id });
                  }}
                >
                  Remove routine
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          )}
        </div>
        <div>
          <TypographyH1>{workout.title}</TypographyH1>
          <TypographyH2>{workout.description}</TypographyH2>
        </div>
        <div className="flex flex-row gap-4">
          {time && (
            <div className="flex flex-col">
              <TypographyH4>Time</TypographyH4>
              <span>{time}</span>
            </div>
          )}
          <div className="flex flex-col">
            <TypographyH4>Volume</TypographyH4>
            <span>{volume} kg</span>
          </div>
          <div className="flex flex-col">
            <TypographyH4>Sets</TypographyH4>
            <span>{sets} sets</span>
          </div>
        </div>
      </CardHeader>
      <Divider />
      <CardBody className="flex flex-col gap-2">
        <TypographyH2>Workout</TypographyH2>
        {workout.exercises.slice(0, 3).map((w, i) => (
          <div key={i} className="flex flex-row items-center gap-2">
            <Avatar src={w.exercise.imageURL} size="md" />
            {w.sets.length} sets of {w.exercise.name}
          </div>
        ))}
        {workout.exercises.length > 3 && (
          <>
            <div className="text-center text-sm text-default-400">
              See {workout.exercises.length - 3} more exercises
            </div>
          </>
        )}
        <div className="flex flex-row items-center">
          <AvatarGroup max={3} size="sm">
            {workout.likers.map((l) => (
              <Avatar key={l._id} src={l.imageURL} />
            ))}
          </AvatarGroup>
          <span className="ms-2 text-sm">{workout.likers.length} likes</span>
          <span className="flex-1 text-right text-sm">0 comments</span>
        </div>
      </CardBody>
      <Divider />
      <CardFooter className="grid grid-cols-3 gap-2">
        <Button
          isIconOnly
          className="w-full"
          size="sm"
          variant="light"
          onPress={onToggleLike}
        >
          <ThumbsUp />
        </Button>
        <Button
          isIconOnly
          className="under-construction w-full"
          size="sm"
          variant="light"
        >
          <MessageCircle />
        </Button>
        <Button
          isIconOnly
          className="under-construction w-full"
          size="sm"
          variant="light"
        >
          <Share />
        </Button>
      </CardFooter>
    </Card>
  );
}
