import {
  TypographyH1,
  TypographyH2,
  TypographyH4,
} from "@/components/typography";
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
  User,
} from "@nextui-org/react";
import { MessageCircle, Share, ThumbsUp } from "lucide-react";
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
        ? humanReadiableDuration(workout.startTime, workout._creationTime)
        : undefined,
    [workout],
  );
  const volume = useMemo(
    () => calculateVolume(workout.exercises, workout.bodyweight),
    [workout],
  );
  const sets = useMemo(() => countSets(workout.exercises), [workout]);

  return (
    <Card radius="none">
      <CardHeader className="flex flex-col items-start gap-2">
        <User
          as={Link}
          href={`/user/${user.username}`}
          avatarProps={{ src: user.imageURL }}
          name={user.name}
          description={humanReadibleTimeDiff(workout._creationTime)}
        />
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
            <Avatar src={w.exercise.imageURL} size="sm" />
            {w.sets.length} sets of {w.exercise.name}
          </div>
        ))}
        <div className="flex flex-row items-center">
          <AvatarGroup max={3} size="sm">
            {workout.likers.map((l) => (
              <Avatar key={l._id} src={l.imageURL} />
            ))}
          </AvatarGroup>
          <span className="ms-2 text-small font-medium text-foreground">
            {workout.likers.length} likes
          </span>
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
