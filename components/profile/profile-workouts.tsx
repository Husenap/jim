import { useProfileContext } from "@/components/profile/profile-context";
import { TypographyH2 } from "@/components/typography";
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

export default function ProfileWorkouts() {
  const { profileUser, workouts } = useProfileContext();

  return (
    <>
      <TypographyH2>Workouts</TypographyH2>
      <div className="-mx-2 flex flex-col gap-4">
        {workouts.map((workout) => (
          <Card className="under-construction" radius="none">
            <CardHeader>
              <User
                avatarProps={{ src: profileUser?.imageURL }}
                name={profileUser?.name}
                description={humanReadibleTimeDiff(workout._creationTime)}
              />
            </CardHeader>
            <Divider />
            <CardBody>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit
              incidunt quod harum quia at quo ut magni recusandae necessitatibus
              quidem. Beatae nostrum delectus excepturi. Laboriosam, iusto sed.
              Corporis, beatae at.
            </CardBody>
            <Divider />
            <CardFooter className="grid grid-cols-3 gap-2">
              <Button isIconOnly className="w-full" size="sm" variant="light">
                <ThumbsUp />
              </Button>
              <Button isIconOnly className="w-full" size="sm" variant="light">
                <MessageCircle />
              </Button>
              <Button isIconOnly className="w-full" size="sm" variant="light">
                <Share />
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </>
  );
}
