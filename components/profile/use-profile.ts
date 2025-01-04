import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useQuery } from "convex/react";
import { useMemo } from "react";

export function useProfile({ username }: {
  username?: Id<"users">;
}) {
  const currentUser = useQuery(api.users.current);
  const profileUser = username ? useQuery(api.users.byUsername, { username: username }) : currentUser;
  const workouts = useQuery(api.workouts.current) ?? [];

  const isFollowee = useQuery(api.users.isFollowee, { userId: profileUser?._id }) ?? false;
  const isFollower = useQuery(api.users.isFollower, { userId: profileUser?._id }) ?? false;

  const followers = useQuery(api.users.followers, { userId: profileUser?._id }) ?? [];
  const followees = useQuery(api.users.followees, { userId: profileUser?._id }) ?? [];

  const isOwner = !!(currentUser && profileUser && currentUser._id === profileUser._id);

  const context = useMemo(() => ({
    currentUser,
    profileUser,
    isOwner,
    isVisitor: !isOwner,
    isFollowee,
    isFollower,
    workouts,
    followers,
    followees,
    numFollowers: followers.length,
    numFollowees: followees.length,
  }), [
    currentUser,
    profileUser,
    isFollowee,
    isFollower,
    workouts,
    followers,
    followees
  ]);

  return context;
};

export type UseProfileReturn = ReturnType<typeof useProfile>;