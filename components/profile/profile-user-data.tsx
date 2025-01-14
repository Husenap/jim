"use client";

import BackButton from "@/components/back-button";
import PageContainer from "@/components/page-container";
import { useProfileContext } from "@/components/profile/profile-context";
import { TypographyH1, TypographyH4 } from "@/components/typography";
import { Doc } from "@/convex/_generated/dataModel";
import {
  Avatar,
  Button,
  Drawer,
  DrawerBody,
  DrawerContent,
  Skeleton,
  useDisclosure,
  User,
} from "@nextui-org/react";
import Link from "next/link";

export default function ProfileUserData() {
  const {
    profileUser,
    workouts,
    numFollowers,
    numFollowees,
    followers,
    followees,
  } = useProfileContext();

  return (
    <>
      {profileUser ? (
        <div className="flex w-full flex-row items-center gap-4">
          <Avatar src={profileUser.imageURL} className="h-20 w-20" />
          <div className="flex flex-1 flex-col">
            <TypographyH1>{profileUser.name}</TypographyH1>
            <div className="grid w-full grid-cols-3">
              <div className="flex flex-col">
                <TypographyH4>Workouts</TypographyH4>
                <span>{workouts.length}</span>
              </div>
              <div className="flex flex-col">
                <FollowerDrawer
                  title="Followers"
                  numFollowers={numFollowers}
                  followers={followers}
                />
              </div>
              <div className="flex flex-col">
                <FollowerDrawer
                  title="Following"
                  numFollowers={numFollowees}
                  followers={followees}
                />
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="inline-flex items-center gap-2">
          <div>
            <Skeleton className="flex h-20 w-20 rounded-full" />
          </div>
        </div>
      )}
    </>
  );
}

function FollowerDrawer({
  title,
  numFollowers,
  followers,
}: {
  title: string;
  numFollowers: number;
  followers: Doc<"users">[];
}) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <>
      <div onClick={onOpen}>
        <TypographyH4>{title}</TypographyH4>
        <span>{numFollowers}</span>
      </div>
      <Drawer
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        hideCloseButton
        size="full"
        placement="right"
      >
        <DrawerContent>
          {(onClose) => (
            <DrawerBody className="p-0">
              <PageContainer
                disableViewTransitions
                topNavbar={
                  <div className="grid w-full grid-cols-3 items-center py-3">
                    <div>
                      <BackButton onPress={onClose} />
                    </div>
                    <span className="text-center">{title}</span>
                  </div>
                }
              >
                <div className="-mx-2 flex flex-col justify-start">
                  {followers.map((u, i) => (
                    <Button
                      key={u._id + i}
                      radius="none"
                      className="h-auto justify-start p-2"
                      as={Link}
                      href={`/user/${u.username}`}
                      variant="light"
                    >
                      <User
                        name={u.name}
                        description={`@${u.username}`}
                        avatarProps={{ src: u.imageURL }}
                      />
                    </Button>
                  ))}
                </div>
              </PageContainer>
            </DrawerBody>
          )}
        </DrawerContent>
      </Drawer>
    </>
  );
}
