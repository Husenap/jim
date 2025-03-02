import { usePostContext } from "@/components/post/post-context";
import { Avatar, AvatarGroup } from "@heroui/react";

export default function WorkoutLikesAndComments() {
  const { workout } = usePostContext();

  if (!workout) return <></>;

  return (
    <div className="flex flex-row items-center">
      <AvatarGroup max={3} size="sm">
        {workout.likers.map((l) => (
          <Avatar key={l._id} src={l.imageURL} />
        ))}
      </AvatarGroup>
      <span className="ms-2 text-sm">{workout.likers.length} likes</span>
      <span className="flex-1 text-right text-sm">0 comments</span>
    </div>
  );
}
