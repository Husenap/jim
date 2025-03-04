import { usePostContext } from "@/components/post/post-context";
import { Avatar, AvatarGroup, Link } from "@heroui/react";

export default function WorkoutLikesAndComments() {
  const { workout, commentsDisclosure } = usePostContext();

  if (!workout) return <></>;

  return (
    <div className="flex flex-row items-center justify-between">
      <div className="flex flex-row items-center gap-2">
        <AvatarGroup max={3} size="sm">
          {workout.likers.map((l) => (
            <Avatar key={l._id} src={l.imageURL} />
          ))}
        </AvatarGroup>
        <span className="text-sm">{workout.likers.length} likes</span>
      </div>
      <Link
        className="text-sm"
        color="foreground"
        onPress={commentsDisclosure.onOpen}
      >
        {workout.comments.length} comments
      </Link>
    </div>
  );
}
