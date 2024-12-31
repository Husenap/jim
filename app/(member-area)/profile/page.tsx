"use client";

import BottomNavbar from "@/app/(member-area)/bottom-navbar";
import Navbar from "@/app/(member-area)/profile/navbar";
import PageContainer from "@/components/page-container";
import {
  TypographyH1,
  TypographyH2,
  TypographyH4,
} from "@/components/typography";
import { api } from "@/convex/_generated/api";
import { Doc } from "@/convex/_generated/dataModel";
import humanReadibleTimeDiff from "@/utils/time-diff";
import {
  Avatar,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Divider,
  Link,
  Skeleton,
  User,
} from "@nextui-org/react";
import { useQuery } from "convex/react";
import {
  Calendar,
  ChartLine,
  Dumbbell,
  MessageCircle,
  PersonStanding,
  Share,
  ThumbsUp,
} from "lucide-react";

export default function Page() {
  const user = useQuery(api.users.current);

  return (
    <PageContainer topNavbar={<Navbar />} bottomNavbar={<BottomNavbar />}>
      {user ? <UserData user={user} /> : <UserDataSkeleton />}
      {user?.bio && (
        <p className="my-prose">
          {user.bio.split("\n").map((text, i) => (
            <span key={i}>
              {text}
              <br />
            </span>
          ))}
        </p>
      )}
      {user?.link && (
        <Link isExternal href={`https://${user.link}`}>
          {user.link}
        </Link>
      )}

      <TypographyH2>Dashboard</TypographyH2>
      <div className="grid grid-cols-2 grid-rows-2 gap-2">
        <Button className="under-construction" startContent={<ChartLine />}>
          Statistics
        </Button>
        <Button as={Link} href="/profile/exercises" startContent={<Dumbbell />}>
          Exercises
        </Button>
        <Button
          className="under-construction"
          startContent={<PersonStanding />}
        >
          Measures
        </Button>
        <Button className="under-construction" startContent={<Calendar />}>
          Calendar
        </Button>
      </div>

      <TypographyH2>Workouts</TypographyH2>
      <div className="-mx-2 flex flex-col gap-4">
        <Card className="under-construction" radius="none">
          <CardHeader>
            <User
              avatarProps={{
                src: user?.imageURL,
              }}
              name={user?.name || user?.username}
              description={humanReadibleTimeDiff(user?._creationTime)}
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
        <Card className="under-construction" radius="none">
          <CardHeader>
            <User
              avatarProps={{
                src: user?.imageURL,
              }}
              name={user?.name || user?.username}
              description={humanReadibleTimeDiff(user?._creationTime)}
            />
          </CardHeader>
          <Divider />
          <CardBody>
            Modi assumenda ea cumque explicabo odio aperiam ut sit fuga
            doloremque magni fugit praesentium deserunt cum, blanditiis rem
            asperiores porro maiores. Soluta reiciendis ad quasi deleniti
            doloremque necessitatibus saepe non!
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
      </div>
    </PageContainer>
  );
}

function UserData({ user }: { user: Doc<"users"> }) {
  return (
    <div className="flex w-full flex-row items-center gap-4">
      <Avatar src={user.imageURL} className="h-20 w-20" />
      <div className="flex flex-1 flex-col">
        <TypographyH1>{user.name}</TypographyH1>
        <div className="under-construction grid w-full grid-cols-3">
          <div className="flex flex-col">
            <TypographyH4>Workouts</TypographyH4>
            <span>81</span>
          </div>
          <div className="flex flex-col">
            <TypographyH4>Followers</TypographyH4>
            <span>11</span>
          </div>
          <div className="flex flex-col">
            <TypographyH4>Following</TypographyH4>
            <span>10</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function UserDataSkeleton() {
  return (
    <div className="inline-flex items-center gap-2">
      <div>
        <Skeleton className="flex h-20 w-20 rounded-full" />
      </div>
    </div>
  );
}
