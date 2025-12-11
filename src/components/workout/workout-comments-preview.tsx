import { usePostContext } from "@/components/post/post-context";
import { Avatar } from "@heroui/react";

export default function WorkoutCommentsPreview() {
  const { workout, commentsDisclosure, currentUser } = usePostContext();

  if (!workout) return <></>;
  if (workout.comments.length <= 0) return <></>;

  return (
    <>
      <div className="flex w-full p-3">
        <div
          className="flex cursor-pointer flex-col gap-2"
          onClick={commentsDisclosure.onOpen}
        >
          {workout.comments.slice(0, 2).map((comment) => (
            <div key={comment._id} className="flex flex-row gap-2">
              <Avatar size="sm" src={comment.author.imageURL} />
              <span className="flex-1 pt-1">
                <span className="pr-2 font-semibold">
                  {comment.author.name}
                </span>
                <span>{comment.text}</span>
              </span>
            </div>
          ))}
          <div className="flex flex-row gap-2">
            {currentUser && <Avatar size="sm" src={currentUser.imageURL} />}
            <span className="text-foreground/70 pt-1">Write a comment...</span>
          </div>
        </div>
      </div>
    </>
  );
}
