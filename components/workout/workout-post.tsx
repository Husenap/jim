import { TypographyH1, TypographyH2 } from "@/components/typography";
import { Doc } from "@/convex/_generated/dataModel";
import { humanReadibleTimeDiff } from "@/utils/time-diff";
import {
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

export default function WorkoutPost({
  workout,
  user,
}: {
  workout: Doc<"workouts">;
  user: Doc<"users">;
}) {
  return (
    <Card radius="none">
      <CardHeader>
        <User
          as={Link}
          href={`/user/${user.username}`}
          avatarProps={{ src: user.imageURL }}
          name={user.name}
          description={humanReadibleTimeDiff(workout._creationTime)}
        />
      </CardHeader>
      <Divider />
      <CardBody>
        <TypographyH1>{workout.title}</TypographyH1>
        <TypographyH2>{workout.description}</TypographyH2>
      </CardBody>
      <Divider />
      <CardFooter className="grid grid-cols-3 gap-2">
        <Button
          isIconOnly
          className="under-construction w-full"
          size="sm"
          variant="light"
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
