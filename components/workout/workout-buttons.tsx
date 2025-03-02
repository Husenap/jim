import { usePostContext } from "@/components/post/post-context";
import ShareButton from "@/components/share-button";
import { Button, cn } from "@heroui/react";
import { MessageCircle, ThumbsUp } from "lucide-react";

export default function WorkoutButtons() {
  const { workout, user, toggleLike, currentUser } = usePostContext();

  if (!workout) return <></>;

  return (
    <div className="grid w-full grid-cols-3 gap-2">
      <Button
        isIconOnly
        className="w-full"
        size="sm"
        variant="light"
        onPress={toggleLike}
      >
        <ThumbsUp
          className={cn({
            "text-primary": workout.likers.some(
              (l) => l._id === currentUser?._id,
            ),
          })}
        />
      </Button>
      <Button
        isIconOnly
        className="under-construction w-full"
        size="sm"
        variant="light"
      >
        <MessageCircle />
      </Button>
      <ShareButton
        className="w-full"
        size="sm"
        data={{
          title: `${user?.name}'s workout: ${workout.title}`,
          text: workout.description,
          url: `/post/${workout._id}`,
        }}
      />
    </div>
  );
}
