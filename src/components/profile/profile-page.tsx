"use client";

import FullscreenSpinner from "@/components/fullscreen-spinner";
import { useProfileContext } from "@/components/profile/profile-context";
import ProfileDashboard from "@/components/profile/profile-dashboard";
import ProfileUserData from "@/components/profile/profile-user-data";
import ProfileWorkouts from "@/components/profile/profile-workouts";
import { TypographyH2 } from "@/components/typography";
import { api } from "@/convex/_generated/api";
import { Button, Link } from "@heroui/react";
import { useMutation } from "convex/react";

export default function ProfilePage({
  showDashboard = false,
  showRoutines = false,
}: {
  showDashboard?: boolean;
  showRoutines?: boolean;
}) {
  const {
    profileUser,
    currentUser,
    isVisitor,
    isFollowee,
    isFollower,
    workouts,
  } = useProfileContext();
  const toggleFollow = useMutation(api.users.toggleFollow);

  if (profileUser === undefined) {
    return <FullscreenSpinner />;
  }

  return (
    <>
      <ProfileUserData />
      {profileUser?.bio && (
        <p className="my-prose">
          {profileUser.bio.split("\n").map((text, i) => (
            <span key={i}>
              {text}
              <br />
            </span>
          ))}
        </p>
      )}
      {profileUser?.link && (
        <Link isExternal href={`https://${profileUser.link}`}>
          {profileUser.link}
        </Link>
      )}
      {profileUser && currentUser && isVisitor && (
        <Button
          onPress={() => toggleFollow({ userId: profileUser._id })}
          className="w-full"
          color={isFollowee ? "default" : "primary"}
        >
          {isFollowee ? "Following" : isFollower ? "Follow Back" : "Follow"}
        </Button>
      )}
      {showDashboard && <ProfileDashboard />}
      {showRoutines && (
        <div className="under-construction">
          <TypographyH2>Routines</TypographyH2>
        </div>
      )}
      {workouts.length > 0 && <ProfileWorkouts />}
    </>
  );
}
